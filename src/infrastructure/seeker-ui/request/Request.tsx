import { useEffect, useState } from 'react';
import { FetchService } from '../../../application/fetch/fetch.service';
import { SkrDetails, SkrLabel, SkrTabProps, SkrTag } from '../common';
import { SkrTabContainer } from '../common/tabscontainer/TabsContainer';
import {
  SkrInput,
  SkrRequestConfig,
  SkrRequestInput,
  SkrResponse
} from './components';

import { Subscription } from 'rxjs';
import { UtilityService } from '../../../application/common/util.service';
import { FetchResponse } from '../../../domain/interfaces/fetch.interface';
import { HttpStatusInfo } from '../../../domain/interfaces/http.interface';
import { SkrTooltip } from '../common/tooltip/Tooltip';
import './Request.css';

// COMPONENT-----------------------------------------------------------
const Request = () => {
  const [queryResponse, setQueryResponse] = useState<FetchResponse>(
    {} as FetchResponse
  );
  const [statusInfo, setStatusInfo] = useState<HttpStatusInfo>({
    title: '',
    description: ''
  });

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  let subscription: Subscription | undefined;
  let abortController: AbortController | undefined;

  const onInputSend = (inputConfig: SkrInput) => {
    setLoading(true);
    abortController = new AbortController();
    subscription = FetchService.getInstance()
      .execute({
        method: inputConfig.method,
        url: inputConfig.url,
        controller: abortController!
      })
      .subscribe({
        next: (res: FetchResponse) => {
          if (res) {
            setQueryResponse(res);
            const statInfo: HttpStatusInfo = UtilityService.getHttpStatusInfo(
              res.status
            );
            // if a status message comes from the serve, we add it to the description
            if (res.statusText) {
              statInfo.description = ''.concat(
                'Status text: ',
                res.statusText,
                '\n\nGeneric info: ',
                statInfo.description
              );
            }
            setStatusInfo(statInfo);
            console.log('res :>> ', res);
          }
        },
        error(err) {
          console.error(err);
          setError(err);
        },
        complete() {
          setLoading(false);
          //TODO: setduration (request duration in ms) should be set when ok and when error.
        }
      });
  };

  useEffect(() => {
    return () => {
      // cancel request
      abortController?.abort();
      // clean the observable suscription
      subscription?.unsubscribe();
    };
  }, [subscription, abortController]);

  // REQUEST BODY CONFIGURATION-----------------------
  const tabsRequesBody: SkrTabProps[] = [
    {
      id: '1',
      label: 'Tab 1',
      children: <p>Hello world</p>
    },
    { id: '2', label: 'Tab 2', children: <p>Contenido de la pestaña 2</p> }
  ];

  // RESPONSE BODY ------------------------------------

  const tabsResponseBody: SkrTabProps[] = [
    {
      id: '1',
      label: 'Response',
      children: (
        <SkrResponse
          src={queryResponse.data ? queryResponse.data : queryResponse}
        ></SkrResponse>
      )
    },
    { id: '2', label: 'Tab 2', children: <p>Contenido de la pestaña 2</p> }
  ];

  return (
    <div className="skr-request-container">
      <SkrRequestConfig className="skr-request-config"></SkrRequestConfig>
      <SkrRequestInput onSend={onInputSend}></SkrRequestInput>
      <SkrDetails classname="skr-request-details" label="Request body" open>
        <SkrTabContainer tabs={tabsRequesBody} />
      </SkrDetails>
      <SkrDetails classname="skr-request-details" label="Response body">
        <SkrTabContainer tabs={tabsResponseBody}>
          {queryResponse?.status ? (
            <SkrTooltip
              title={statusInfo.title}
              titleSeparator
              text={statusInfo.description}
            >
              <SkrTag
                backgroundColor={UtilityService.getHttpStatusColor(
                  queryResponse.status
                )}
                SkrLabel={<SkrLabel fontWeight="bold" label="Status:" />}
                type="fill"
                text={`${queryResponse.status}`}
              />
            </SkrTooltip>
          ) : (
            <span className="skr-request__tags-keys">Status:</span>
          )}

          <span>
            <span className="skr-request__tags-keys">Time:</span>
            {queryResponse.queryDuration?.time &&
              queryResponse.queryDuration?.measure &&
              `${queryResponse.queryDuration.time} ${queryResponse.queryDuration.measure}`}
          </span>
          <span>
            <span className="skr-request__tags-keys">Size:</span>
            {queryResponse.size?.length &&
              queryResponse.size?.measure &&
              `${queryResponse.size.length} ${queryResponse.size.measure}`}
          </span>
        </SkrTabContainer>
      </SkrDetails>
    </div>
  );
};
export default Request;
//TODO: implement title on span tags. When you hover time or size.
// TODO: implement status
// TODO: fix response prefix in data visualization

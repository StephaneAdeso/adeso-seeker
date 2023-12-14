import { useEffect, useState } from 'react';
import { FetchService } from '../../../application/fetch/fetch.service';
import { SkrDetails, SkrTabProps } from '../common';
import { SkrTabContainer } from '../common/tabscontainer/TabsContainer';
import { SkrQueryConfig, SkrQueryInput, SkrQueryResponse } from './components';

import { Subscription } from 'rxjs';
import { FetchResponse } from '../../../domain/interfaces/fetch.interface';
import './Query.css';
import { SkrInputConfig } from './components/query-input/QueryInput';

// COMPONENT-----------------------------------------------------------
const SkrQuery = () => {
  const [queryResponse, setQueryResponse] = useState<FetchResponse>(
    {} as FetchResponse
  );

  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  /** open or closed status of request details */
  const [reqStatus, setReqStatus] = useState(true);
  /** open or closed status of response details */
  const [resStatus, setResStatus] = useState(true);
  /** Update the request details satus */
  const handleReqChange = (newStatus: boolean) => {
    setReqStatus(newStatus);
  };
  /** Update the response details satus */
  const handleResChange = (newStatus: boolean) => {
    setResStatus(newStatus);
  };

  let subscription: Subscription | undefined;
  let abortController: AbortController | undefined;

  const onInputSend = (inputConfig: SkrInputConfig) => {
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

  return (
    <div className="skr-query__container">
      <SkrQueryConfig className="skr-query__config"></SkrQueryConfig>
      <SkrQueryInput onSend={onInputSend}></SkrQueryInput>

      <SkrDetails
        classname="skr-query__details"
        label="Request body"
        onToggle={handleReqChange}
        open={reqStatus}
      >
        <SkrTabContainer tabs={tabsRequesBody} />
      </SkrDetails>

      <SkrDetails
        classname="skr-query__details"
        label="Response body"
        onToggle={handleResChange}
        open={resStatus}
      >
        <SkrQueryResponse queryResponse={queryResponse} isLoading={loading} />
      </SkrDetails>
    </div>
  );
};

export default SkrQuery;

//TODO: implement title on span tags. When you hover time or size.
// TODO: implement status
// TODO: fix response prefix in data visualization

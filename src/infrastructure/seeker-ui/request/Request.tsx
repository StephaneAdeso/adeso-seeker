import { useEffect, useState } from 'react';
import { FetchService } from '../../../application/fetch/fetch.service';
import { SkrDetails, SkrTabProps } from '../common';
import { SkrTabContainer } from '../common/tabscontainer/TabsContainer';
import {
  SkrInput,
  SkrRequestConfig,
  SkrRequestInput,
  SkrResponse
} from './components';

import './Request.css';
import { FetchResponse } from '../../../domain/interfaces/fetch.interface';
import { Subscription } from 'rxjs';

// COMPONENT-----------------------------------------------------------
const Request = () => {
  const [responseData, setResponseData] = useState<object>({});
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
        controller: abortController
      })
      .subscribe({
        next: (res: FetchResponse) => {
          if (res.data) {
            setResponseData(res.data);
          }
        },
        error(err) {
          console.error(err);
          setError(err);
        },
        complete() {
          setLoading(false);
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
      children: <SkrResponse src={responseData}></SkrResponse>
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
        <SkrTabContainer tabs={tabsResponseBody} />
      </SkrDetails>
    </div>
  );
};

export default Request;

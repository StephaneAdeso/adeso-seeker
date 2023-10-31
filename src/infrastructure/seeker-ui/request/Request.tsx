import { useEffect, useMemo, useState } from 'react';
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
  const subscriptions: Subscription = useMemo(() => new Subscription(), []);
  // https://api.publicapis.org/entries
  useEffect(() => {
    return () => {
      console.log('desmontado');
      subscriptions.unsubscribe();
    };
  }, []);

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
  const [responseData, setResponseData] = useState({});
  const tabsResponseBody: SkrTabProps[] = [
    {
      id: '1',
      label: 'Response',
      children: <SkrResponse src={responseData}></SkrResponse>
    },
    { id: '2', label: 'Tab 2', children: <p>Contenido de la pestaña 2</p> }
  ];

  const onInputSend = (inputConfig: SkrInput) => {
    console.log('holitas');
    subscriptions.add(
      FetchService.getInstance()
        .execute({
          method: inputConfig.type,
          url: inputConfig.url
        })
        .subscribe({
          next: (res: FetchResponse) => {
            console.log('hola');
            if (res.data) {
              setResponseData(res.data);
              console.log('res :>> ', res);
              console.log('res.data :>> ', res.data);
            }
          },
          error(err) {
            console.log('err :>> ', err);
          }
        })
    );
  };

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

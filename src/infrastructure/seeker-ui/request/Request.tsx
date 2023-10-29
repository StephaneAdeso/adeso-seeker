import { SkrDetails, SkrTabProps } from '../common';
import { SkrTabContainer } from '../common/tabscontainer/TabsContainer';
import { SkrInput, SkrRequestConfig, SkrRequestInput } from './components';

import './Request.css';

const Request = () => {
  const tabs: SkrTabProps[] = [
    { id: '1', label: 'Tab 1', children: <p>Contenido de la pestaña 1</p> },
    { id: '2', label: 'Tab 2', children: <p>Contenido de la pestaña 2</p> }
  ];

  const onInputSend = (inputConfig: SkrInput) => {
    console.log(inputConfig);
  };

  return (
    <div className="skr-request-container">
      <SkrRequestConfig className="skr-request-config"></SkrRequestConfig>
      <SkrRequestInput onSend={onInputSend}></SkrRequestInput>
      <SkrDetails classname="skr-request-details" label="Request body" open>
        <SkrTabContainer tabs={tabs} />
      </SkrDetails>
      <SkrDetails classname="skr-request-details" label="Response body">
        Response content
      </SkrDetails>
    </div>
  );
};

export default Request;

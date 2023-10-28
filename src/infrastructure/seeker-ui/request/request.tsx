import { SkrTabProps } from '../common';
import { SkrTabContainer } from '../common/tabscontainer/TabsContainer';
import { SkrRequestConfig, SkrRequestInput } from './components';
import './Request.css';

//TODO: SkrRequestBody and SkrResponseBody

const Request = () => {
  const tabs: SkrTabProps[] = [
    { id: '1', label: 'Tab 1', children: <p>Contenido de la pestaña 1</p> },
    { id: '2', label: 'Tab 2', children: <p>Contenido de la pestaña 2</p> }
    // Puedes agregar más pestañas aquí
  ];

  return (
    <div className="skr-request-container">
      <SkrRequestConfig className="skr-request-config"></SkrRequestConfig>
      <SkrRequestInput></SkrRequestInput>
      <SkrTabContainer tabs={tabs} />
    </div>
  );
};

export default Request;

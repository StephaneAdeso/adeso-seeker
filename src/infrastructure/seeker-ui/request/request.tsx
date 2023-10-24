import { SkrRequestConfig, SkrRequestInput } from './components';
import './Request.css';

const Request = () => {
  return (
    <div className="skr-request-container">
      <SkrRequestConfig className="skr-request-config"></SkrRequestConfig>
      <SkrRequestInput></SkrRequestInput>
    </div>
  );
};

export default Request;

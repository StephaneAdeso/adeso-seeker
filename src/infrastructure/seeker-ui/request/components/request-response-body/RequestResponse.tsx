import ReactJson from '@microlink/react-json-view';
import { useEffect, useState } from 'react';
import './RequestResponse.css';

interface SkrResponseProps {
  src: object;
}

export const SkrResponse = ({ src }: SkrResponseProps): JSX.Element => {
  const [jsonData, setJsonData] = useState(src);

  useEffect(() => {
    setJsonData(src);
  }, [src]);
  return (
    <>
      <ReactJson
        src={jsonData}
        name="response"
        iconStyle="triangle"
        theme={'monokai'}
      />
    </>
  );
};

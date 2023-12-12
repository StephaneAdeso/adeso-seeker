import ReactJson from '@microlink/react-json-view';
import { useEffect, useState } from 'react';
import './RequestResponse.css';

interface SkrResponseProps {
  src: object;
}

export const SkrResponse = ({ src }: SkrResponseProps): JSX.Element => {
  const [jsonData, setJsonData] = useState(src);
  // TODO: control when there is no json data

  useEffect(() => {
    setJsonData(src);
    console.log('src :>> ', src);
  }, [src]);
  return (
    <>
      <ReactJson
        src={jsonData}
        name={false}
        iconStyle="triangle"
        theme={'monokai'}
        displayDataTypes={false}
      />
    </>
  );
};

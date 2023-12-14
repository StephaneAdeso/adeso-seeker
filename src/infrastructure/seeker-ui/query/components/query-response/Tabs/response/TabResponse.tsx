import { FetchResponse } from '../../../../../../../domain/interfaces/fetch.interface';
import { SkrEditor } from '../../../../../common';
import './TabResponse.css';

interface SkrTabResponseProps {
  className?: string;
  queryResponse: FetchResponse;
  isLoading?: boolean;
}

export const SkrTabResponse = ({
  className = '',
  isLoading = false,
  queryResponse
}: SkrTabResponseProps): JSX.Element => {
  return (
    <div className={`skr-tab-response__container ${className}`}>
      {isLoading ? (
        <div> Loading data...</div>
      ) : (
        <SkrEditor value={queryResponse.data} />
      )}
    </div>
  );
};

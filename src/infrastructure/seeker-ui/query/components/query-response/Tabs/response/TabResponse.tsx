import { QueryResult } from '../../../../../../../domain/models/query-result.model';
import { SkrEditor } from '../../../../../common';
import './TabResponse.css';

interface SkrTabResponseProps {
  className?: string;
  queryResult: QueryResult;
  isLoading?: boolean;
}

export const SkrTabResponse = ({
  className = '',
  isLoading = false,
  queryResult: queryResult
}: SkrTabResponseProps): JSX.Element => {
  return (
    <div className={`skr-tab-response__container ${className}`}>
      {isLoading ? (
        <div> Loading data...</div>
      ) : (
        <SkrEditor
          value={queryResult.data}
          className="skr-tab-response__editor"
        />
      )}
    </div>
  );
};

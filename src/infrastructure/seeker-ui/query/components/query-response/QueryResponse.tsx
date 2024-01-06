import {
  CalculatedBytes,
  CalculatedTime,
  UtilityService
} from '../../../../../application/common/util.service';
import { HttpStatusInfo } from '../../../../../domain/interfaces/http.interface';
import { QueryResult } from '../../../../../domain/models/query-result.model';
import { SkrLabel, SkrTabContainer, SkrTag, SkrTooltip } from '../../../common';
import { SkrTabProps } from '../../../common/tabscontainer/TabsContainer';
import './QueryResponse.css';
import { SkrTabResponse } from './Tabs/response/TabResponse';

interface SkrResponseProps {
  /** query response data */
  queryResult: QueryResult;
  isLoading?: boolean;
  className?: string;
}
// TODO: control when there is no json data
export const SkrQueryResponse = ({
  queryResult,
  isLoading = false,
  className = ''
}: SkrResponseProps): JSX.Element => {
  const tabsContainer: SkrTabProps[] = [
    {
      id: '1',
      label: 'Response',
      children: (
        <SkrTabResponse isLoading={isLoading} queryResult={queryResult} />
      )
    },
    { id: '2', label: 'Tab 2', children: <p>Contenido de la pestaña 2</p> }
  ];

  const { data, startDate, endDate, status, statusText } = queryResult;

  // Generate information about the status code of the response
  let statusInfo: HttpStatusInfo | null = null;
  if (status) {
    statusInfo = UtilityService.getHttpStatusInfo(status, statusText);
  }

  // Generate duration information about the query
  let queryDuration: CalculatedTime | null = null;
  if (startDate && endDate) {
    queryDuration = UtilityService.getEllapsedTime(startDate, endDate);
  }

  // Generate size info of the query
  let size: CalculatedBytes | null = null;
  if (data) {
    size = UtilityService.getByteSize(JSON.stringify(data), 2);
  }

  const getTabsMenu = () => {
    return (
      <>
        {status ? (
          <SkrTooltip
            title={statusInfo?.title || ''}
            titleSeparator
            text={statusInfo?.description || ''}
          >
            <SkrTag
              backgroundColor={UtilityService.getHttpStatusColor(status)}
              SkrLabel={<SkrLabel fontWeight="bold" label="Status:" />}
              type="fill"
              text={`${status}`}
            />
          </SkrTooltip>
        ) : (
          <span className="skr-query-response__menu-tag-key">Status:</span>
        )}

        <span>
          <span className="skr-query-response__menu-tag-key">Time:</span>
          {queryDuration?.calculatedTime &&
            queryDuration?.calculatedMeasure &&
            `${queryDuration.calculatedTime} ${queryDuration.calculatedMeasure}`}
        </span>
        <span>
          <span className="skr-query-response__menu-tag-key">Size:</span>
          {size?.calculatedSize &&
            size?.calculatedMeasure &&
            `${size.calculatedSize} ${size.calculatedMeasure}`}
        </span>
      </>
    );
  };

  return (
    <div className={`skr-query-response__container ${className}`}>
      <SkrTabContainer
        tabs={tabsContainer}
        className="skr-query-response__skr-tab-container"
      >
        {getTabsMenu()}
      </SkrTabContainer>
    </div>
  );
};

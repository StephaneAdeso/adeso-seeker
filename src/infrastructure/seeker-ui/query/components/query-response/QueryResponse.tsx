import { UtilityService } from '../../../../../application/common/util.service';
import { FetchResponse } from '../../../../../domain/interfaces/fetch.interface';
import { SkrLabel, SkrTabContainer, SkrTag, SkrTooltip } from '../../../common';
import { SkrTabProps } from '../../../common/tabscontainer/TabsContainer';
import './QueryResponse.css';
import { SkrTabResponse } from './Tabs/response/TabResponse';

interface SkrResponseProps {
  /** query response data */
  queryResponse: FetchResponse;
  isLoading?: boolean;
  className?: string;
}
// TODO: control when there is no json data
export const SkrQueryResponse = ({
  queryResponse,
  isLoading = false,
  className = ''
}: SkrResponseProps): JSX.Element => {
  const tabsContainer: SkrTabProps[] = [
    {
      id: '1',
      label: 'Response',
      children: (
        <SkrTabResponse isLoading={isLoading} queryResponse={queryResponse} />
      )
    },
    { id: '2', label: 'Tab 2', children: <p>Contenido de la pestaña 2</p> }
  ];

  const getTabsMenu = () => {
    return (
      <>
        {queryResponse?.status ? (
          <SkrTooltip
            title={queryResponse.statusInfo.title}
            titleSeparator
            text={queryResponse.statusInfo.description}
          >
            <SkrTag
              backgroundColor={UtilityService.getHttpStatusColor(
                queryResponse.status
              )}
              SkrLabel={<SkrLabel fontWeight="bold" label="Status:" />}
              type="fill"
              text={`${queryResponse.status}`}
            />
          </SkrTooltip>
        ) : (
          <span className="skr-query-response__menu-tag-key">Status:</span>
        )}

        <span>
          <span className="skr-query-response__menu-tag-key">Time:</span>
          {queryResponse.queryDuration?.time &&
            queryResponse.queryDuration?.measure &&
            `${queryResponse.queryDuration.time} ${queryResponse.queryDuration.measure}`}
        </span>
        <span>
          <span className="skr-query-response__menu-tag-key">Size:</span>
          {queryResponse.size?.length &&
            queryResponse.size?.measure &&
            `${queryResponse.size.length} ${queryResponse.size.measure}`}
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

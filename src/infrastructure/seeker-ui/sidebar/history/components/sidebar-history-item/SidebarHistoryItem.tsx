import './SidebarHistoryItem.css';
import { HttpColors, HttpVerb } from '../../../../../../domain/enums/http.enum';

interface SkrSidebarHistoryItemProps {
  classname?: string;
  key: string;
  date: Date;
  method?: HttpVerb;
  methodColor?: HttpColors;
  title?: string;
  text: string;
  onClick?: () => void;
}

export const SkrSidebarHistoryItem = ({
  classname = '',
  key,
  date,
  method = HttpVerb.get,
  methodColor = HttpColors.success,
  title,
  text,
  onClick
}: SkrSidebarHistoryItemProps): JSX.Element => {
  return (
    <div className={`skr-sidebar-history-item__container ${classname}`}>
      <div className="skr-sidebar-history-item__info">
        <div
          style={{ backgroundColor: methodColor }}
          className="skr-sidebar-history-item__tag"
        >
          {method.toUpperCase()}
        </div>
        <div className="skr-sidebar-history-item__text-container">
          {title && <div>{title}</div>}
          {!title && <div>{text}</div>}
        </div>
      </div>
      {title && (
        <div className="skr-sidebar-history-item__text--description">
          {text}
        </div>
      )}
      <div className="skr-sidebar-history-item__info skr-sidebar-history-item__text--description">
        <div>{`${date.toISOString().slice(0, 10)}`}</div>
      </div>
    </div>
  );
  // TODO: SEGUIR ESTILANDO LAS FECHAS
};

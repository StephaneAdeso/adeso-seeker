import './SidebarHistoryItem.css';
import { HttpColors, HttpVerb } from '../../../../../../domain/enums/http.enum';

interface SkrSidebarHistoryItemProps {
  classname?: string;
  id: string;
  date: Date;
  method?: HttpVerb;
  methodColor?: HttpColors;
  title?: string;
  text: string;
  onClick?: () => void;
}

export const SkrSidebarHistoryItem = ({
  classname = '',
  id,
  date,
  method = HttpVerb.get,
  methodColor = HttpColors.success,
  title,
  text,
  onClick
}: SkrSidebarHistoryItemProps): JSX.Element => {
  return (
    <div className={`skr-sidebar-history-item-container ${classname}`}>
      <div className="skr-sidebar-history-item__info">
        <div style={{ backgroundColor: methodColor }}>{method}</div>
        <div className=".skr-sidebar-history-item__text-container">
          {title && <div>{title}</div>}
          {!title && <div>{text}</div>}
        </div>
        {title && <div>{text}</div>}
      </div>
      <div className="skr-sidebar-history-item__info">
        <div>{date.toISOString()}</div>
        <div>xxx days ago</div>
      </div>
    </div>
  );
};

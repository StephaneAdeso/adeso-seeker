import { HttpColors, HttpVerb } from '../../../../domain/enums/http.enum';
import { SkrSidebarHistoryItem } from './components/sidebar-history-item/SidebarHistoryItem';
import './sidebar-history.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
const SkrSidebarHistory = () => {
  const mockup = [
    <SkrSidebarHistoryItem
      key="1"
      date={new Date()}
      method={HttpVerb.post}
      title="Title"
      text="post/example"
      methodColor={HttpColors.clientError}
    />,
    <SkrSidebarHistoryItem
      key="2"
      date={new Date()}
      method={HttpVerb.patch}
      text="post/example"
    />,
    <SkrSidebarHistoryItem key="3" date={new Date()} text="post/example" />
  ];
  return (
    <>
      {mockup.map((el) => {
        return (
          <>
            {el}
            <div className="skr-sidebar-history__separator"></div>
          </>
        );
      })}
    </>
  );
};

export default SkrSidebarHistory;

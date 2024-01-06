import { HttpColors, HttpVerb } from '../../../../domain/enums/http.enum';
import { SkrSidebarHistoryItem } from './components/sidebar-history-item/SidebarHistoryItem';

// eslint-disable-next-line @typescript-eslint/naming-convention
const SkrSidebarHistory = () => {
  return (
    <>
      <SkrSidebarHistoryItem
        id="1"
        date={new Date()}
        method={HttpVerb.post}
        text="post/example"
        methodColor={HttpColors.clientError}
      />
      <SkrSidebarHistoryItem
        id="2"
        date={new Date()}
        method={HttpVerb.patch}
        text="post/example"
      />
      <SkrSidebarHistoryItem id="3" date={new Date()} text="post/example" />
    </>
  );
};

export default SkrSidebarHistory;

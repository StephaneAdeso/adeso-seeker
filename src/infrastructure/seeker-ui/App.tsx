/* eslint-disable @typescript-eslint/naming-convention */

import * as React from 'react';
import { DocumentTitles } from '../enums/document-titles.enum';
import './App.css';

const SidebarCollections = React.lazy(
  () => import('./sidebar-collections/sidebar-collections')
);
const Request = React.lazy(() => import('./request/Request'));

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
  return <>{renderUI()}</>;
};

function renderUI() {
  switch (document.title) {
    case DocumentTitles.sidebarCollections:
      return <SidebarCollections />;
    case DocumentTitles.request:
      return <Request />;
    default:
      break;
  }
}

export default App;

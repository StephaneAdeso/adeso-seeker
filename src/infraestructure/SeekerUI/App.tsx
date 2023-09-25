/* eslint-disable @typescript-eslint/naming-convention */

import * as React from 'react';
import { DocumentTitles } from '../enums/document-titles.enum';
import './App.css';
import SidebarCollections from './components/sidebar-collections';
import Request from './components/request';

/* const SidebarCollections = React.lazy(
  () => import('./components/sidebar-collections')
);
const Request = React.lazy(() => import('./components/request')); */

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = () => {
  return <>{renderUI()}</>;
};

function renderUI() {
  console.log(document.title);
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

import * as React from 'react';
import { DocumentTitles } from '../enums/document-titles.enum';
import './App.css';

const SkrSidebarCollections = React.lazy(
  () => import('./sidebar/collections/sidebar-collections')
);
const SkrSidebarHistory = React.lazy(
  () => import('./sidebar/history/sidebar-history')
);
const SkrQuery = React.lazy(() => import('./query/Query'));

const App = () => {
  return <>{renderUI()}</>;
};

function renderUI() {
  switch (document.title) {
    case DocumentTitles.sidebarCollections:
      return <SkrSidebarCollections />;
    case DocumentTitles.sidebarHistory:
      return <SkrSidebarHistory />;
    case DocumentTitles.request:
      return <SkrQuery />;
    default:
      //TODO: Maybe create a 404 component.
      break;
  }
}

export default App;

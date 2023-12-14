import * as React from 'react';
import { DocumentTitles } from '../enums/document-titles.enum';
import './App.css';

const SkrSidebarCollections = React.lazy(
  () => import('./sidebar-collections/sidebar-collections')
);
const SkrQuery = React.lazy(() => import('./query/Query'));

const App = () => {
  return <>{renderUI()}</>;
};

function renderUI() {
  switch (document.title) {
    case DocumentTitles.sidebarCollections:
      return <SkrSidebarCollections />;
    case DocumentTitles.request:
      return <SkrQuery />;
    default:
      break;
  }
}

export default App;

import React = require('react');
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('seekerRoot')!);

root.render(
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);

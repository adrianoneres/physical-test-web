import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const a = b => {
  console.log('test' + b);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

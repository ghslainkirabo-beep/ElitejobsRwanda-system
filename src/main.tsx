import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppEngine } from './core/AppEngine';
import './index.css'; // Optional Tailwind imports if configured

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppEngine />
  </React.StrictMode>
);
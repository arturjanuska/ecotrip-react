import React from 'react';
import ReactDOM from 'react-dom/client';
import Footer from './components/footer/Footer.tsx';
import App from './App.tsx';

import './utils/i18n/index.ts';
import GlobalLayout from './components/layout/GlobalLayout.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalLayout>
      <App />
    </GlobalLayout>
    <Footer />
  </React.StrictMode>
);

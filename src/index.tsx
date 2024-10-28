import React from 'react';
import '@uswds/uswds';
import '@uswds/uswds/css/uswds.min.css';
import 'src/index.css';
import App from 'src/App';
import { store } from 'src/store/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

const urlParams = new URLSearchParams(window.location.search);
const mock = urlParams.get('mock');
if (urlParams.has('mock')) {
  if (mock != null) {
    sessionStorage.setItem('mock', mock);
  }
}

const container = document.getElementById('root');
if (!container) throw new Error("Could not find root element with id 'root'");

const isHomePage = window.location.pathname === '/';
if (isHomePage) {
  const dapScript = document.createElement('script');
  dapScript.async = true;
  dapScript.type = 'text/javascript';
  dapScript.src = 'https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=SBA';
  dapScript.id = '_fed_an_ua_tag';
  document.head.appendChild(dapScript);
}

if (!isHomePage) {
  const touchPointsScript = document.createElement('script');
  touchPointsScript.async = true;
  touchPointsScript.src = 'https://touchpoints.app.cloud.gov/touchpoints/86b5b5ea.js';
  document.body.prepend(touchPointsScript);
}

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

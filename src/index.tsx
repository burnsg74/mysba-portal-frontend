import React from "react";
import "@uswds/uswds";
import "@uswds/uswds/css/uswds.min.css";
import "src/index.css";
import App from "src/App";
import { store } from "src/store/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

const container = document.getElementById("root");
if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

import React from "react";
import "./index.css";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";

import { createRoot } from "react-dom/client";
import '@trussworks/react-uswds/lib/uswds.css';
import '@trussworks/react-uswds/lib/index.css';
const container = document.getElementById("root");

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

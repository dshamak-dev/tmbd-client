import React, { createElement } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./app/App";

import "./index.css";

const rootEl = document.getElementById("root");

if (rootEl != null) {
  const root = createRoot(rootEl);
  root.render(createElement(App));
}

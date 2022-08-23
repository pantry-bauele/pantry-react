import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ResetScroll } from "./components/ResetScroll";

const toRender = (
  /* <React.StrictMode> */
  <BrowserRouter>
    <ResetScroll />
    <App />
  </BrowserRouter>
);
/* </React.StrictMode> */

const container = document.getElementById("root");
if (container !== null) {
  const root = createRoot(container);
  root.render(toRender);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

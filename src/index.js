import React from "react";
import ReactDOM from "react-dom";

import ErrorBoundary from "./components/common/ErrorBoundary";
import Landing from "./pages/index";
import reportWebVitals from "./reportWebVitals";

import "./styles/main.scss";

//being only one page, Routing is deliberately being ignored
//and the single page component is directly fed to React engine

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Landing />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

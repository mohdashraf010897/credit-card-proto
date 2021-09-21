import React from "react";
import ReactDOM from "react-dom";

import ErrorBoundary from "./components/common/ErrorBoundary";
import Landing from "./pages/index";

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

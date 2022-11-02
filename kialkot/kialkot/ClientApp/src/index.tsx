import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import SideBand from "./components/side-band/SideBand";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SideBand />
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <SideBand side="right" />
  </React.StrictMode>
);

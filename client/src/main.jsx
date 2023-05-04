import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import User from "./context/User";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <User>
      <App />
    </User>
  </BrowserRouter>
);

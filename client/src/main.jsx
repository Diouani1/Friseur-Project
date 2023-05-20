import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import User from "./context/user/User";
import Admin from "./context/admin/Admin";
import Post from "./context/post/Post";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <User>
      <Admin>
        <Post>
          <App />
        </Post>
      </Admin>
    </User>
  </BrowserRouter>
);

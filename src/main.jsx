import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ArqPlataformApp from "./ArqPlataformApp";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
  document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ArqPlataformApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

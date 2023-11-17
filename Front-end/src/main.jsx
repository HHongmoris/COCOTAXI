import React from "react";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import ReactDOM from "react-dom/client";
import App from "./navigations/App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

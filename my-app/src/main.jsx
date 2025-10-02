import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { Toaster } from "react-hot-toast"; // If using react-hot-toast
// OR
import { ToastContainer } from "react-toastify"; // If using react-toastify
import "react-toastify/dist/ReactToastify.css"; // If using react-toastify

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* Choose one: */}
      <Toaster position="top-right" /> {/* For react-hot-toast */}
      {/* OR */}
      <ToastContainer position="top-right" /> {/* For react-toastify */}
    </Provider>
  </React.StrictMode>
);

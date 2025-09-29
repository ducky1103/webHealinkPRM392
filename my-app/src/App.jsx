import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./assets/routers/router.jsx";

function App() {
  return (
    <div className="min-h-svh h-full bg-primary">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

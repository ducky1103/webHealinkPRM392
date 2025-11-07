import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./assets/routers/router.jsx";
import { AudioPlayerProvider } from "./contexts/AudioPlayerContext";

function App() {
  return (
    <AudioPlayerProvider>
      <div className="min-h-svh h-full bg-primary">
        <RouterProvider router={router} />
      </div>
    </AudioPlayerProvider>
  );
}

export default App;

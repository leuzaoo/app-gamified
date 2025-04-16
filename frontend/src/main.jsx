import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { StrictMode } from "react";
import React from "react";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
);

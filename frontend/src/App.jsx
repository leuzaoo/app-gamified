import { Routes, Route } from "react-router-dom";
import React from "react";

import RegisterPage from "./pages/Register";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;

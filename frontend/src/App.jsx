import { Routes, Route } from "react-router-dom";
import React from "react";

import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;

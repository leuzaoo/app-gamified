import { Routes, Route } from "react-router-dom";
import React from "react";

import RegisterPage from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;

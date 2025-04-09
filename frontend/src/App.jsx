import React, { useEffect } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LoaderCircleIcon } from "lucide-react";

import SetUsernamePage from "./pages/SetUsernamePage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import { useAuthStore } from "./store/auth.store";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.username && location.pathname !== "/set-username") {
    return <Navigate to="/set-username" replace />;
  }

  if (user.username && location.pathname === "/set-username") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated && user) {
    if (location.pathname === "/set-username") {
      return children;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, authCheck, user } = useAuthStore();
  console.log(user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth)
    return (
      <div className="mt-20 flex justify-center">
        <LoaderCircleIcon className="animate-spin" />
      </div>
    );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/set-username"
        element={
          <ProtectedRoute>
            <SetUsernamePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectAuthenticatedUser>
            <RegisterPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        }
      />
    </Routes>
  );
}

export default App;

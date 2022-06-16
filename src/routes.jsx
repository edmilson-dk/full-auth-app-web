import { useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import { Dashboard } from "./pages/dashboard";
import { LoginPage } from "./pages/login";
import { MFAAuthPage } from "./pages/mfa-auth";
import { RegisterPage } from "./pages/register";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const { validateUserSession } = useAuth();

  useEffect(() => {
    (async () => {
      await validateUserSession();
    })();
  }, []);

  return token === "undefined" || !token ? (
    <Navigate to={{ pathname: "/login" }} replace />
  ) : (
    <>{children}</>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mfa-auth" element={<MFAAuthPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

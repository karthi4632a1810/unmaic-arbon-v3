import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());

  useEffect(() => {
    // Keep in sync with auth events
    const unsubscribe = authService.subscribe((session) => {
      setIsAuthenticated(Boolean(session && session.expiresAt > Date.now()));
    });
    return unsubscribe;
  }, []);

  if (!isAuthenticated) {
    // Redirect to /admin/login while saving current location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

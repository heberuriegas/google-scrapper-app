import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Redirect to /sign_in if a user is not authenticated
 * @param obj
 * @param {ReactElement} obj.children
 * @returns {ReactElement}
 */
export const RequireAuth = ({ children }: { children: ReactElement }) => {
  let { user } = useAuth();
  let location = useLocation();

  if (!user) {
    return <Navigate to="/sign_in" state={{ from: location }} replace />;
  }

  return children;
};

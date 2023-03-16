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
  let auth = useAuth();
  let location = useLocation();

  if (!auth?.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/sign_in" state={{ from: location }} replace />;
  }

  return children;
};

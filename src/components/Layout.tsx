import { Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Header } from "./Header";

/**
 * Main layout for UI, contains Header & Outlet
 * @returns {ReactElement}
 */
export const Layout = () => {
  const { user } = useAuth();
  return (
    <div data-testid="layout">
      {user && <Header />}
      <Outlet />
    </div>
  );
};

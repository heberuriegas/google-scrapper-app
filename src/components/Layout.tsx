import { Outlet } from "react-router-dom";

/**
 * Main layout for UI, contains Header & Outlet
 * @returns {ReactElement}
 */
export const Layout = () => (
  <div data-testid="layout">
    <Outlet />
  </div>
);

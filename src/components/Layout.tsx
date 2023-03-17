import { Outlet } from "react-router-dom";
import { Header } from "./Header";

/**
 * Main layout for UI, contains Header & Outlet
 * @returns {ReactElement}
 */
export const Layout = () => (
  <div data-testid="layout">
    <Header />
    <Outlet />
  </div>
);

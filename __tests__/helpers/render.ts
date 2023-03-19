import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import * as useAuth from "../../src/features/auth/hooks/useAuth";

export const renderWithRouter = (
  ui: ReactElement,
  { route = "/", authenticated = true } = {}
) => {
  window.history.pushState({}, "Test page", route);

  jest.spyOn(useAuth, "useAuth").mockReturnValue({
    user: authenticated ? { id: 1, email: "test@test.com" } : undefined,
    userLoading: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: jest.fn(),
  });

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

export const renderWithAct = async (ui: ReactElement) => {
  // eslint-disable-next-line
  return act(() => {
    render(ui);
  });
};

export const renderWithAuth = async (ui: ReactElement) => {
  jest.spyOn(useAuth, "useAuth").mockReturnValue({
    user: { id: 1, email: "test@test.com" },
    userLoading: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: jest.fn(),
  });

  await renderWithAct(ui);
};

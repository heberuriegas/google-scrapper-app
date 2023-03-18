import { screen } from "@testing-library/react";
import { renderWithRouter } from "../__tests__/helpers/render";
import App from "./App";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
new MockAdapter(axios);

describe("render", () => {
  it("app component", () => {
    renderWithRouter(<App />, { route: "/" });
    const linkElement = screen.getByTestId("app");
    expect(linkElement).toBeInTheDocument();
  });

  it("inside layout", () => {
    renderWithRouter(<App />, { route: "/" });
    const linkElement = screen.getByTestId("layout");
    expect(linkElement).toBeInTheDocument();
  });

  describe("for authenticated users", () => {
    beforeEach(() => {});

    it("list keywords", () => {
      renderWithRouter(<App />, { route: "/" });
      const user = screen.getByText(/test@test.com/i);
      expect(user).toBeInTheDocument();
    });
  });

  describe("for unauthenticated users", () => {
    it("sign in page by default", () => {
      renderWithRouter(<App />, { route: "/", authenticated: false });
      const linkElement = screen.getByText(/Sign in to access your account/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});

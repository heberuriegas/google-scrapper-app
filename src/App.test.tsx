import { screen } from "@testing-library/react";
import { renderWithRouter } from "../__tests__/helpers/renderWithRouter";
import App from "./App";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
new MockAdapter(axios);

it("renders app component", () => {
  renderWithRouter(<App />, { route: "/" });
  const linkElement = screen.getByTestId("app");
  expect(linkElement).toBeInTheDocument();
});

it("render inside layout", () => {
  renderWithRouter(<App />, { route: "/" });
  const linkElement = screen.getByTestId("layout");
  expect(linkElement).toBeInTheDocument();
});

describe("for authenticated users", () => {});

describe("for unauthenticated users", () => {
  it("renders sign in page by default", () => {
    renderWithRouter(<App />, { route: "/" });
    const linkElement = screen.getByText(/Sign in to access your account/i);
    expect(linkElement).toBeInTheDocument();
  });
});

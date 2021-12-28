import React from "react";

import { render, cleanup, screen } from "@testing-library/react";

import App from "./App";

afterEach(cleanup);

it("tests that the unauthorized routes are rendered when there is no token", async () => {
  render(<App />);
  expect(await screen.queryByText(/Logga in/i)).toBeInTheDocument();
});

it("tests that the toolbar is rendered without logout button when unauthorized", async () => {
  render(<App />);
  expect(await screen.queryByText(/Logga ut/i)).not.toBeInTheDocument();
});

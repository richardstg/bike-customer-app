import React from "react";

import { render, cleanup, screen } from "@testing-library/react";

import Auth from "./auth";

afterEach(cleanup);

it("tests that the login button is rendered", async () => {
  render(<Auth />);
  expect(await screen.findByText(/Logga in/i)).toBeInTheDocument();
});

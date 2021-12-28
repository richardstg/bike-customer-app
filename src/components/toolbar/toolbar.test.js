import React from "react";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Toolbar from "./toolbar";

afterEach(cleanup);

it("tests that the logout button shows when authenticated", async () => {
  render(<Toolbar isAuthenticated={true} />);

  expect(await screen.findByText(/Logga ut/i)).toBeInTheDocument();
});

it("tests that the logout button does not show when unauthenticated", async () => {
  render(<Toolbar isAuthenticated={false} />);

  expect(await screen.queryByText(/Logga ut/i)).not.toBeInTheDocument();
});

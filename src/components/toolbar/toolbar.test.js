import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Toolbar from "./toolbar";

afterEach(cleanup);

it("tests that the logout button shows when authenticated", async () => {
  render(
    <Router>
      <Toolbar isAuthenticated={true} />
    </Router>
  );

  expect(await screen.findByText(/Logga ut/i)).toBeInTheDocument();
});

it("tests that the logout button does not show when unauthenticated", async () => {
  render(
    <Router>
      <Toolbar isAuthenticated={false} />
    </Router>
  );

  expect(await screen.queryByText(/Logga ut/i)).not.toBeInTheDocument();
});

it("tests that the logo is rendered when unauthenticated", async () => {
  render(
    <Router>
      <Toolbar isAuthenticated={false} />
    </Router>
  );

  expect(await screen.queryByText(/seab./i)).toBeInTheDocument();
});

it("tests that the logo is rendered when authenticated", async () => {
  render(
    <Router>
      <Toolbar isAuthenticated={true} />
    </Router>
  );

  expect(await screen.queryByText(/seab./i)).toBeInTheDocument();
});

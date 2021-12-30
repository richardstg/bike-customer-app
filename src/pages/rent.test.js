import React from "react";

import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import Rent from "./rent";

afterEach(cleanup);

it("tests that the title is rendered", async () => {
  render(<Rent match={{ params: { tripId: "1" } }} />);
  expect(await screen.findByText(/Pågående resa/i)).toBeInTheDocument();
});

it("tests that the success message does not show", async () => {
  render(<Rent match={{ params: { tripId: "1" } }} />);
  expect(
    await screen.queryByText(/Resan avslutades./i)
  ).not.toBeInTheDocument();
});

it("tests that the error message does not show", async () => {
  render(<Rent match={{ params: { tripId: "1" } }} />);
  expect(
    await screen.queryByText(/Avslutning misslyckades./i)
  ).not.toBeInTheDocument();
});

it("tests that the error message shows when failure", async () => {
  render(<Rent match={{ params: { tripId: "1" } }} />);

  expect(
    await screen.queryByText(/Avslutning misslyckades./i)
  ).not.toBeInTheDocument();

  const button = screen.getByTestId("finish-trip");

  fireEvent.click(button);

  expect(
    await screen.queryByText(/Avslutning misslyckades./i)
  ).not.toBeInTheDocument();
});

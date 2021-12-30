import React from "react";

import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import RentBike from "./rentbike";

afterEach(cleanup);

it("tests that the modal is open", async () => {
  render(<RentBike showModal={true} />);
  expect(await screen.findByText(/Hyr cykel?/i)).toBeInTheDocument();
});

it("tests that the modal is closed", async () => {
  render(<RentBike showModal={false} />);
  expect(await screen.queryByText(/Hyr cykel?/i)).not.toBeInTheDocument();
});

it("tests that the title is rendered", async () => {
  render(<RentBike showModal={true} />);
  expect(await screen.findByText(/Hyr cykel?/i)).toBeInTheDocument();
});

it("tests that the error message is rendered", async () => {
  render(<RentBike showModal={true} error={"there was an error"} />);
  expect(
    await screen.findByText(/Hyrningen misslyckades./i)
  ).toBeInTheDocument();
});

it("tests that the success message is rendered", async () => {
  render(<RentBike showModal={true} success={"great success"} />);
  expect(await screen.findByText(/Hyrning startad./i)).toBeInTheDocument();
});

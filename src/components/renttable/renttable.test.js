import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { render, cleanup, screen } from "@testing-library/react";

import RentTable from "./renttable";

afterEach(cleanup);

const trip = {
  start_time: "2022-01-01 10:00",
  stop_time: "2022-01-02 10:00",
  price: "99",
  average_speed: "77",
  distance: "88",
};

it("tests that the title is rendered", async () => {
  render(
    <Router>
      <RentTable trip={trip} />
    </Router>
  );
  expect(await screen.findByText(/Avslutad resa/i)).toBeInTheDocument();
});

it("tests that the start time is rendered", async () => {
  render(
    <Router>
      <RentTable trip={trip} />
    </Router>
  );
  expect(await screen.findByText(/1 jan. 2022 10:00/i)).toBeInTheDocument();
});

it("tests that the stop time is rendered", async () => {
  render(
    <Router>
      <RentTable trip={trip} />
    </Router>
  );
  expect(await screen.findByText(/2 jan. 2022 10:00/i)).toBeInTheDocument();
});

it("tests that the price is rendered", async () => {
  render(
    <Router>
      <RentTable trip={trip} />
    </Router>
  );
  expect(await screen.findByText(/99/i)).toBeInTheDocument();
});

it("tests that the average speed is rendered", async () => {
  render(
    <Router>
      <RentTable trip={trip} />
    </Router>
  );
  expect(await screen.findByText(/77/i)).toBeInTheDocument();
});

it("tests that the distance is rendered", async () => {
  render(
    <Router>
      <RentTable trip={trip} />
    </Router>
  );
  expect(await screen.findByText(/88/i)).toBeInTheDocument();
});

it("tests that the back button is rendered", async () => {
  render(
    <Router>
      <RentTable trip={trip} />
    </Router>
  );
  expect(await screen.findByText(/Tillbaka/i)).toBeInTheDocument();
});

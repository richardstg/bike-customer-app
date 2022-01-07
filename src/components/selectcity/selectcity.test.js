import React from "react";

import { render, cleanup, screen } from "@testing-library/react";

import SelectCity from "./selectcity";

afterEach(cleanup);

const cities = [
  { _id: "61a76026bb53f131584de9b1", name: "Stockholm" },
  { _id: "61a76026bb53f131584de9b2", name: "Karlstad" },
];

const selectedCity = "61a76026bb53f131584de9b2";

it("tests that the select options are rendered", async () => {
  render(<SelectCity cities={cities} selectedCity={selectedCity} />);
  expect(await screen.findByText(/Stockholm/i)).toBeInTheDocument();
  expect(await screen.findByText(/Karlstad/i)).toBeInTheDocument();
});

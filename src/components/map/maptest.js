import React from "react";

import { render, cleanup, screen } from "@testing-library/react";

import Map from "./map";

afterEach(cleanup);

const city = {
  _id: "61a76026bb53f131584de9b1",
  name: "Stockholm",
  northwest: { lat: "56.193013", long: "15.559232" },
  southeast: { lat: "56.152144", long: "15.634511" },
};

const loadingStations = [
  {
    _id: "61a76026bb53f131584de9b1",
    coordinates: {
      northwest: { lat: "56.181368", long: "15.590497" },
      southeast: { lat: "56.181187", long: "15.590952" },
    },
  },
];
const parkingSpots = [
  {
    _id: "61a76026bb53f131584de9b1",
    coordinates: {
      northwest: { lat: "56.166459", long: "15.593423" },
      southeast: { lat: "56.166382", long: "15.593662" },
    },
  },
];
const bikes = [
  {
    _id: "61a76026bb53f131584de9b1",
    coordinates: { lat: "59.31853654", long: "18.062855499999998" },
  },
];

it("tests that the success map is rendered", async () => {
  render(
    <Map
      city={city}
      loadingStations={loadingStations}
      parkingSpots={parkingSpots}
      bikes={bikes}
    />
  );
  expect(await screen.findByTestId(/"map-container/i)).toBeInTheDocument();
});

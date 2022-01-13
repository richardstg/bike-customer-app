import React from "react";

import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import RentBike from "./rentbike";

afterEach(cleanup);

const user = {
  _id: "666",
  payment_method: "refill",
  card_information: "222222222222",
  balance: 150,
};

const bike = {
  _id: "123124123",
};

it("tests that the modal is open", async () => {
  render(<RentBike user={user} bike={bike} showModal={true} />);
  expect(await screen.findByText(/Hyr cykel?/i)).toBeInTheDocument();
});

it("tests that the modal is closed", async () => {
  render(<RentBike user={user} bike={bike} showModal={false} />);
  expect(await screen.queryByText(/Hyr cykel?/i)).not.toBeInTheDocument();
});

it("tests that the title is rendered", async () => {
  render(<RentBike user={user} bike={bike} showModal={true} />);
  expect(await screen.findByText(/Hyr cykel?/i)).toBeInTheDocument();
});

it("tests that renting fails when there is no balance", async () => {
  render(
    <RentBike
      user={{ payment_method: "refill", balance: 0 }}
      bike={bike}
      showModal={true}
    />
  );

  expect(
    await screen.findByText(
      /Fyll på pengar eller ändra betalningsmetod för att hyra./i
    )
  ).toBeInTheDocument();
});

it("tests that renting fails when there is no payment method", async () => {
  render(
    <RentBike
      user={{ payment_method: "unknown", balance: 0 }}
      bike={bike}
      showModal={true}
    />
  );

  expect(
    await screen.findByText(
      /Fyll på pengar eller ändra betalningsmetod för att hyra./i
    )
  ).toBeInTheDocument();
});

it("tests that the user id is rendered", async () => {
  render(<RentBike user={user} bike={bike} showModal={true} />);
  expect(await screen.findByText(/666/i)).toBeInTheDocument();
});

it("tests that the bike id is rendered", async () => {
  render(<RentBike user={user} bike={bike} showModal={true} />);
  expect(await screen.findByText(/123124123/i)).toBeInTheDocument();
});

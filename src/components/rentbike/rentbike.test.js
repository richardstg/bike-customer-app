import React from "react";

import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import RentBike from "./rentbike";

afterEach(cleanup);

const user = {
  payment_method: "refill",
  balance: 50,
};

it("tests that the modal is open", async () => {
  render(<RentBike user={user} showModal={true} />);
  expect(await screen.findByText(/Hyr cykel?/i)).toBeInTheDocument();
});

it("tests that the modal is closed", async () => {
  render(<RentBike user={user} showModal={false} />);
  expect(await screen.queryByText(/Hyr cykel?/i)).not.toBeInTheDocument();
});

it("tests that the title is rendered", async () => {
  render(<RentBike user={user} showModal={true} />);
  expect(await screen.findByText(/Hyr cykel?/i)).toBeInTheDocument();
});

it("tests that renting fails when there is no balance", async () => {
  render(
    <RentBike
      user={{ payment_method: "refill", balance: 0 }}
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
      showModal={true}
    />
  );

  expect(
    await screen.findByText(
      /Fyll på pengar eller ändra betalningsmetod för att hyra./i
    )
  ).toBeInTheDocument();
});

it("tests that the error message is rendered", async () => {
  render(
    <RentBike user={user} showModal={true} error={"there was an error"} />
  );
  expect(
    await screen.findByText(/Hyrningen misslyckades./i)
  ).toBeInTheDocument();
});

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { render, cleanup, screen } from "@testing-library/react";

import Home from "./home";

afterEach(cleanup);

it("tests that the select city component is rendered", async () => {
  render(
    <Router>
      <Route>
        <Home
          user={{
            _id: "123",
            payment_method: "refill",
            balance: 100,
            card_information: "1234555555555",
            city: "2335235",
          }}
        />
      </Route>
    </Router>
  );
  expect(await screen.findByTestId(/select-city/i)).toBeInTheDocument();
});

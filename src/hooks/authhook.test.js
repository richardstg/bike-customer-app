import React, { useEffect } from "react";

import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { useAuth } from "./authhook";

afterEach(cleanup);

it("tests that the token is null when initiated", async () => {
  const Component = (props) => {
    const { token, login, logout, userId, userEmail } = useAuth();

    return <div data-testid="token">{token}</div>;
  };
  render(<Component />);
  expect(await screen.findByTestId(/token/i)).toHaveTextContent("");
});

it("tests that the user id is null when initiated", async () => {
  const Component = (props) => {
    const { token, login, logout, userId, userEmail } = useAuth();

    return <div data-testid="userid">{userId}</div>;
  };
  render(<Component />);
  expect(await screen.findByTestId(/userid/i)).toHaveTextContent("");
});

it("tests that the user email is null when initiated", async () => {
  const Component = (props) => {
    const { token, login, logout, userId, userEmail } = useAuth();

    return <div data-testid="useremail">{userEmail}</div>;
  };
  render(<Component />);
  expect(await screen.findByTestId(/useremail/i)).toHaveTextContent("");
});

it("tests that the login function sets the token", async () => {
  const Component = (props) => {
    const { token, login, logout, userId, userEmail } = useAuth();

    useEffect(() => {
      login("11111111", "email@email.com", "supertoken");
    }, [login]);

    return <div data-testid="token">{token}</div>;
  };

  render(<Component />);

  expect(await screen.findByTestId(/token/i)).toHaveTextContent("supertoken");
});

it("tests that the login function sets the user id", async () => {
  const Component = (props) => {
    const { token, login, logout, userId, userEmail } = useAuth();

    useEffect(() => {
      login("11111111", "email@email.com", "supertoken");
    }, [login]);

    return <div data-testid="userid">{userId}</div>;
  };

  render(<Component />);

  expect(await screen.findByTestId(/userid/i)).toHaveTextContent("11111111");
});

it("tests that the login function sets the user email", async () => {
  const Component = (props) => {
    const { token, login, logout, userId, userEmail } = useAuth();

    useEffect(() => {
      login("11111111", "email@email.com", "supertoken");
    }, [login]);

    return <div data-testid="useremail">{userEmail}</div>;
  };

  render(<Component />);

  expect(await screen.findByTestId(/useremail/i)).toHaveTextContent(
    "email@email.com"
  );
});

it("tests that the logout function clears the data", async () => {
  const Component = (props) => {
    const { token, login, logout, userId, userEmail } = useAuth();

    useEffect(() => {
      login("11111111", "email@email.com", "supertoken");
      logout();
    }, [logout, logout]);

    return (
      <>
        <div data-testid="token">{token}</div>;
        <div data-testid="userid">{userId}</div>;
        <div data-testid="useremail">{userEmail}</div>
      </>
    );
  };

  render(<Component />);

  expect(await screen.findByTestId(/token/i)).toHaveTextContent("");
  expect(await screen.findByTestId(/userid/i)).toHaveTextContent("");
  expect(await screen.findByTestId(/useremail/i)).toHaveTextContent("");
});

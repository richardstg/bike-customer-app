import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./hooks/authhook";
import ClipLoader from "react-spinners/ClipLoader";

import Toolbar from "./components/toolbar/toolbar";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Rent from "./pages/rent";

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const [user, setUser] = useState();
  const [userError, setUserError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
          {
            method: "GET",
            // headers: {
            //   Authorization: "Bearer " + token,
            // },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        setUserError(error.message);
        setLoading(false);
      }
    };
    userId && fetchData();
  }, [userId]);

  const authorizedRoutes = (
    <Switch>
      <Route
        exact
        path="/rent/:tripId"
        component={(props) => <Rent {...props} userId={userId} />}
      />
      <Route exact path="/" render={(props) => <Home user={user} />} />
      <Redirect to="/" />
    </Switch>
  );

  const unauthorizedRoutes = (
    <Switch>
      <Route path="/" exact render={(props) => <Auth login={login} />} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App min-vh-100">
      <Router>
        <Toolbar logout={logout} isAuthenticated={!!token} />
        <div className="container">
          {userError && (
            <p className="text-danger mt-2">
              Hämtningen av användare misslyckades. Försök igen senare.
            </p>
          )}
          <ClipLoader color={"#fffff"} loading={loading} size={40} />
          {token && user && authorizedRoutes}
          {token && !user && ""}
          {!token && unauthorizedRoutes}
        </div>
      </Router>
    </div>
  );
};

export default App;

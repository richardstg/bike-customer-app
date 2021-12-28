import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./hooks/authhook";

import Toolbar from "./components/toolbar/toolbar";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Rent from "./pages/rent";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  // const uId = "619f6ee3d0b6c914a2b58514";

  const [user, setUser] = useState([]);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        setUserError(error.message);
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
    <div className="App container pb-5">
      <Router>
        <Toolbar logout={logout} isAuthenticated={!!token} />
        {token ? authorizedRoutes : unauthorizedRoutes}
      </Router>
    </div>
  );
};

export default App;

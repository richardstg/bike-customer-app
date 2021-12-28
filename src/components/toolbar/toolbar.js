import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Toolbar = (props) => {
  const { isAuthenticated, logout } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-4 text-decoration-none">
      {isAuthenticated && (
        <>
          {/* <Link to="/" className="text-decoration-none">
            <span className="m-3 text-dark text-decoration-none">Home</span>
          </Link>
          <Link to="/texts" className="text-decoration-none">
            <span className="m-3 text-dark">Texts</span>
          </Link>
          <Link to="/about" className="text-decoration-none">
            <span className="m-3 text-dark">About</span>
          </Link> */}
          <button className="btn btn-secondary" onClick={logout}>
            Logga ut
          </button>
        </>
      )}
    </nav>
  );
};

export default Toolbar;

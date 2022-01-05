import React from "react";
import { Link } from "react-router-dom";

const Toolbar = (props) => {
  const { isAuthenticated, logout } = props;

  return (
    <nav className="navbar navbar-expand-lg p-2 text-decoration-none mb-3 shadow-sm">
      <div className="d-flex justify-content-between w-100 container">
        <Link to="/" className="text-decoration-none align-middle d-flex">
          <h4 className="text-decoration-none p-2 mb-0 color-signature font-signature">
            seab.
          </h4>
        </Link>
        {isAuthenticated && (
          <button className="button-3" onClick={logout}>
            Logga ut
          </button>
        )}
      </div>
    </nav>
  );
};

export default Toolbar;

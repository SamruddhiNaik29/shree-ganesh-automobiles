import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { AppContext } from "../context/AppContext"; // ✅ use AppContext

const Menubar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AppContext); // ✅ get user + logout from context

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Logo />
          <span className="fw-bolder fs-4 ms-2" style={{ color: "#ff5722" }}>
            गणेश ऑटोमोबाईल्स
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link btn btn-outline-warning rounded-pill px-3"
                to="/generate"
              >
                Generate
              </Link>
            </li>

            <li className="nav-item">
              {user ? (
                <button
                  className="btn btn-danger rounded-pill px-4 ms-2"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-warning rounded-pill px-4 ms-2"
                  onClick={handleLoginClick}
                >
                  Login/Signup
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;

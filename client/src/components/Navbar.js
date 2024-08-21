import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  const headers = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoggedIn = localStorage.getItem("login");
  useEffect(() => {
    if (!isAuthenticated && !isLoggedIn) {
      return headers("/mlogin");
    }
  }, [isAuthenticated, isLoggedIn, headers]);

  const RenderMenu = function () {
    if (isAuthenticated) {
      return (
        <>
          <li>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/mlogin">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/msignup">
              Registration
            </Link>
          </li>
        </>
      );
    }
  };
  return (
    <>
      <nav id="navbar">
        <Link className="navbar-brand" to="/">
          <FontAwesomeIcon icon={faTruck} className="fa-icon" />
          <span>{" Transpo"}</span>
        </Link>
        <ul id="navbar-nav">
          <RenderMenu />
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

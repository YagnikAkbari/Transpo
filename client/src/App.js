import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "./store/userSlice";
import { authActions } from "./store/authSlice";

import MLogin from "./components/MLogin";
import TLogin from "./components/TLogin";
import MSignup from "./components/MSignup";
import TSignup from "./components/TSignup";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import MainLayout from "./MainLayout";
import ErrorPage from "./components/ErrorPage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("login");

  const routes = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/tlogin", element: <TLogin /> },
        { path: "/mlogin", element: <MLogin /> },
        { path: "/msignup", element: <MSignup /> },
        { path: "/tsignup", element: <TSignup /> },
        { path: "/logout", element: <Logout /> },
        { path: "/profile", element: <Profile /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  useEffect(() => {
    if (isLoggedIn && isLoggedIn === "true") {
      dispatch(authActions.login());
      dispatch(
        getUser({
          url: "/getData",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      );
    }
  }, [isLoggedIn, dispatch]);

  return routes;
};

export default App;

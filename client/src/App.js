import React, { createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MLogin from "./components/MLogin";
import TLogin from "./components/TLogin";
import MSignup from "./components/MSignup";
import TSignup from "./components/TSignup";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { authActions } from "./store/auth";
import { useDispatch } from "react-redux";

const Routing = function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tlogin" element={<TLogin />} />
      <Route path="/mlogin" element={<MLogin />} />
      <Route path="/msignup" element={<MSignup />} />
      <Route path="/tsignup" element={<TSignup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("login");
  if (isLoggedIn === "true") {
    dispatch(authActions.login());
  }
  return (
    <>
      <ToastProvider>
        <Navbar />
        <Routing />
      </ToastProvider>
    </>
  );
};

export default App;

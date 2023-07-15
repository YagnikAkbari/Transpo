import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Logout = () => {
  const headers = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch(authActions.logout());
        localStorage.setItem("login", "false");
        headers("/mlogin");

        if (res.status !== 200) {
          console.log("data not received");
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <></>;
};

export default Logout;

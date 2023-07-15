import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { toastConfig } from "../utiles/config";
import { getUser } from "../../store/userSlice";

const useLogin = (config) => {
  const header = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { addToast } = useToasts();

  const emailChangeHandler = (e) => setEmail(e.target.value);
  const passwordChangeHandler = (e) => setPassword(e.target.value);

  const loginFunction = async (e) => {
    e.preventDefault();
    const res = await fetch(config.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      addToast(data.message, { appearance: "error", ...toastConfig });
    } else {
      dispatch(authActions.login());
      dispatch(
        getUser({
          url: "/getData",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      );
      localStorage.setItem("login", "true");
      header("/");
    }
  };

  return {
    email,
    password,
    loginFunction,
    emailChangeHandler,
    passwordChangeHandler,
  };
};
export default useLogin;

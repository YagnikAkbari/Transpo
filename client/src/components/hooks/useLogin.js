import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { getUser, userActions } from "../../store/userSlice";

const useLogin = (config) => {
  const header = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      dispatch(
        userActions.getToaster({ type: "error", message: data.message })
      );
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

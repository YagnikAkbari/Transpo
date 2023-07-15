import React from "react";
import { Link } from "react-router-dom";
import useLogin from "./hooks/useLogin";

const TLogin = () => {
  const {
    email,
    password,
    loginFunction,
    emailChangeHandler,
    passwordChangeHandler,
  } = useLogin({ url: "/tsignin" });

  return (
    <>
      <div className="login-page">
        <form method="POST" className="login login-manu">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={emailChangeHandler}
            autoComplete="off"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={passwordChangeHandler}
            placeholder="Password"
            autoComplete="off"
          />
          <input
            className="btn btn-primary"
            type="submit"
            value="Login"
            name="signin"
            onClick={(e) => loginFunction(e)}
          ></input>
          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/tsignup" className="new-link">
                Register
              </Link>
            </p>
            <Link to="/mLogin" className="new-link">
              Login as Manufacturer
            </Link>
          </div>
        </form>
        <img
          src="https://img.freepik.com/free-vector/filling-system-illustration-concept_114360-832.jpg?size=626&ext=jpg&ga=GA1.2.1540159973.1687596564&semt=sph"
          alt="Login"
          className="login-image"
        />
        <h1>Login as Transporter</h1>
        <p>Sign in to continue to Transpo.</p>
      </div>
    </>
  );
};

export default TLogin;

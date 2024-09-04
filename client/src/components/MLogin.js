import React from "react";
import { Link } from "react-router-dom";
import useLogin from "./hooks/useLogin";

const MLogin = () => {
  const {
    email,
    password,
    showPassword,
    loginFunction,
    emailChangeHandler,
    passwordChangeHandler,
    showPasswordHandler,
  } = useLogin({ url: "/msignin" });
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
            type={showPassword ? "text" : "password" }
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={passwordChangeHandler}
            placeholder="Password"
            autoComplete="off"
          />
          <div className="d-flex gap-2 pt-3">
            <input
              type="checkbox"
              id="show_password"              
              checked={showPassword}
              onClick={showPasswordHandler}
            />
            <label htmlFor="show_password">Show Passowrd</label>
          </div>
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
              <Link to="/msignup" className="new-link">
                Register
              </Link>
            </p>
            <Link to="/tLogin" className="new-link">
              Login as Transporter
            </Link>
          </div>
        </form>
        <img
          src="https://img.freepik.com/free-vector/filling-system-illustration-concept_114360-832.jpg?size=626&ext=jpg&ga=GA1.2.1540159973.1687596564&semt=sph"
          alt="Login"
          className="login-image"
        />
        <h1>Login as Manufaturer</h1>
        <p>Sign in to continue to Transpo.</p>
      </div>
    </>
  );
};

export default MLogin;

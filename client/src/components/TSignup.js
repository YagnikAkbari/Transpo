import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { toastConfig } from "./utiles/config";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

const TSignup = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    uname: "",
    email: "",
    phone: "",
    vehicleId: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const { addToast } = useToasts();

  const postData = async (e) => {
    e.preventDefault();
    const { uname, email, phone, vehicleId, password, cpassword } = user;

    const res = await fetch("http://localhost:5000/tregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname,
        email,
        phone,
        vehicleId,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {      
      dispatch(
        userActions.getToaster({
          type: "error",
          message: data?.errors?.map((item) => Object?.values(item)).join("\n"),
        })
      );
    } else {
      addToast(data.message, { appearance: "success", ...toastConfig });
      history("/tlogin");
    }
  };
  return (
    <>
      <div className="registeration-page">
        <img
          src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?size=626&ext=jpg&ga=GA1.2.1540159973.1687596564&semt=sph"
          alt="Register"
          className="registeration-image"
        />
        <h1>Register as Transporter</h1>
        <p>Get your free Transpo account now.</p>
        <form className="register register-manu" method="POST">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="uname"
            placeholder="Your Name"
            autoComplete="off"
            value={user.uname}
            onChange={handleInputs}
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            autoComplete="off"
            value={user.email}
            onChange={handleInputs}
          />
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="phone Number"
            autoComplete="off"
            value={user.phone}
            onChange={handleInputs}
          />

          <label htmlFor="vehicle-id" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="vehicle-id"
            name="vehicleId"
            placeholder="GJ05FE 4812"
            autoComplete="off"
            value={user.vehicleId}
            onChange={handleInputs}
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            value={user.password}
            onChange={handleInputs}
          />
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="text"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="confirm your password"
            autoComplete="off"
            value={user.cpassword}
            onChange={handleInputs}
          />
          <input
            className="btn btn-primary"
            type="submit"
            value="Register"
            name="signup"
            onClick={postData}
          ></input>
        </form>
        <div className="registration-footer">
          <p>
            Already have an account?{" "}
            <Link to="/tlogin" className="new-link">
              Login
            </Link>
          </p>
          <Link to="/msignup" className="new-link">
            Register as a Manufacturer.
          </Link>
        </div>
      </div>
    </>
  );
};

export default TSignup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { toastConfig } from "./utiles/config";

const MSignup = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    uname: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    vehicleId: "",
    address: "",
  });

  const { addToast } = useToasts();

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { uname, email, phone, password, cpassword, address } = user;
    const res = await fetch("/mregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname,
        email,
        phone,
        password,
        cpassword,
        address,
      }),
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      addToast(data.message, { appearance: "error", ...toastConfig });
    } else {
      addToast(data.message, { appearance: "success", ...toastConfig });
      history("/mlogin");
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
        <h1>Register as Manufacturer</h1>
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
          <label htmlFor="phone" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Your factoury Address"
            autoComplete="off"
            value={user.address}
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
            <Link to="/mlogin" className="new-link">
              Login
            </Link>
          </p>
          <Link to="/tsignup" className="new-link">
            Register as a Transporter.
          </Link>
        </div>
      </div>
    </>
  );
};

export default MSignup;

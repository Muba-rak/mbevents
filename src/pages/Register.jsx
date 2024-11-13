import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import login from "../assets/login.png";
import logo from "../assets/logo.png";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import ActionBtn from "../components/ActionBtn";

const Register = () => {
  return (
    <div className="vh-100 d-flex justify-content-center justify-content-lg-betwee align-items-center py-2  myform container">
      {/* <div className="d-none d-lg-bloc h-100">
        <img src={login} alt="login image" className="login" />
      </div> */}
      <form className="p-3  p-lg-5 shadow-lg rounded-3">
        <Link to="/">
          <img src={logo} alt="logo" className="d-block mx-auto my-2" />
        </Link>
        <h1 className="fs-3">Create Account</h1>
        <p className="fs-6 my-2">
          Let’s get you started so you can start joining and creating events
        </p>
        <input
          type="text"
          placeholder="Full Name"
          className="form-control shadow-none w-100 border border-1 border-secondary mb-3 py-2"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="form-control shadow-none w-100 border border-1 border-secondary mb-3 py-2"
        />

        <input
          type="password"
          placeholder="password"
          className="form-control shadow-none w-100 border border-1 border-secondary mb-3 py-2"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-control shadow-none w-100 border border-1 border-secondary mb-3 py-2"
        />
        <div class="form-check mt-2 mb-4 w-100">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label fs-6 fw-normal" for="flexCheckDefault">
            I Agree to <span className="text-decoration-underline">Terms</span>{" "}
            and <span className="text-decoration-underline">Conditions</span>
          </label>
        </div>

        <ActionBtn width={"100%"} content="Sign Up" type="submit" />
        <h2 className="my-3 fs-6">
          Already have an account?
          <Link to="/login" className="text-decoration-none main-color ms-1">
            Sign In
          </Link>{" "}
        </h2>
      </form>
    </div>
  );
};

export default Register;

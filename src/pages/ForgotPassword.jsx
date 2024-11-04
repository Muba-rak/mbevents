import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import ActionBtn from "../components/ActionBtn";

const ForgotPassword = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center reset-container">
      <form className="p-2">
        <Link to="/">
          <img src={logo} alt="logo" className="d-block mx-auto my-2" />
        </Link>
        <h1 className="fs-3">Forgot Password ?</h1>
        <p className="fs-5 my-3">
          No worries, we’ll send you instruction to help
        </p>
        <input
          type="email"
          placeholder="Email Address"
          className="form-control shadow-none w-100 border border-1 border-secondary mb-3 py-2"
        />
        <ActionBtn width={"100%"} content="Reset Password" type="submit" />
      </form>
    </div>
  );
};

export default ForgotPassword;

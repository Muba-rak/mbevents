import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import ActionBtn from "../components/ActionBtn";
const ResetPassword = () => {
  return (
    <div>
      <div className="vh-100 d-flex justify-content-center align-items-center reset-container">
        <form className="p-2">
          <Link to="/">
            <img src={logo} alt="logo" className="d-block mx-auto my-2" />
          </Link>
          <h1 className="fs-3">Reset Password</h1>
          <p className="fs-5 my-3 fw-medium">Enter Your New Password</p>
          <input
            type="password"
            placeholder="Password"
            className="form-control shadow-none w-100 border border-1 border-secondary mb-4 py-2"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control shadow-none w-100 border border-1 border-secondary py-2"
          />
          <ActionBtn
            width={"100%"}
            content="Reset Password"
            type="submit"
            className="mt-3"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

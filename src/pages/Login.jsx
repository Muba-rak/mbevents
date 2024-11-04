import React from "react";
import { useState } from "react";
import login from "../assets/signup.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import ActionBtn from "../components/ActionBtn";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="vh-100 d-flex justify-content-center justify-content-lg-betwee align-items-center py-2  myform container">
      {/* <div className="d-none d-lg-bloc h-100">
        <img src={login} alt="login image" className="login" />
      </div> */}
      <form className="p-3 shadow-lg rounded-2">
        <Link to="/">
          <img src={logo} alt="logo" className="d-block mx-auto my-2" />
        </Link>
        <h1 className="fs-3">Welcome Back</h1>
        <p className="fs-5 my-2">Sign in to your account</p>
        <input
          type="email"
          placeholder="Email Address"
          className="form-control shadow-none w-100 border border-1 border-secondary mb-3 py-3"
        />
        <input
          type="password"
          placeholder="password"
          className="form-control shadow-none w-100 border border-1 border-secondary mb-3 py-3"
        />
        <Link to="/forgot-password" className="text-dark mt-2 mb-3 d-block">
          Forgot Password?
        </Link>
        <ActionBtn width={"100%"} content="Sign In" type="submit" />
        <h2 className="my-3 fs-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none main-color">
            Sign Up
          </Link>{" "}
        </h2>
      </form>
    </div>
  );
};

export default Login;

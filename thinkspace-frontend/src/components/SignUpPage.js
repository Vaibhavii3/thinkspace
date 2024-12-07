import React from "react";
import { Link } from "react-router-dom";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">
          Sign Up
        </h2>
        <form>
          <div className="form-group">
            <label
              htmlFor="name"
              className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="form-label"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="form-label"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="form-input"
            />
          </div>
          <button
            type="submit"
            className="signup-button"
          >
            Sign Up
          </button>
        </form>
        <p className="login-text">
          Already have an account?{" "}
          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

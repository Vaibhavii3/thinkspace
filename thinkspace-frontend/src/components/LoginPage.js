import React, { useState} from "react";
import { Link } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      alert("please fill out all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title"> Login </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="email"
              className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              aria-required="true"
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
            className="login-button">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

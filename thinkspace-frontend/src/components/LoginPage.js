import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/LoginPage.css";

const LoginPage = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Save token to localStorage/sessionStorage
      localStorage.setItem("authToken", response.data.token);

      // Redirect to dashboard or homepage
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };


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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
            
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        
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

import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/SignUpPage.css";

const SignUpPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation for empty fields
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }


    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        setSuccess("Registration successful! Redirecting to login...");
        
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };



  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
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
              value={formData.name}
              onChange={handleChange}
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
            className="signup-button"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

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

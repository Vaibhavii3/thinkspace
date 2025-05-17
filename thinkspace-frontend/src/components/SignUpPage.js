import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/SignUpPage.css";

const SignUpPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  //Request Otp
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError("");
    setOtpLoading(true);

    if (!formData.email) {
      setError("Email is required to request OTP");
      setOtpLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/sendotp`,
        { email: formData.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("OTP Response:", response.data);

      if (response.data.success) {
        setSuccess("OTP sent successfully to your email");
        setOtpSent(true);
      } else {
        setError(response.data.message || "Failed too send OTP");
      }
    } catch (err) {
      console.error("OTP Error:", err);
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Basic validation for empty fields
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.otp) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password do not match.");
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      
    console.log("Response received: ", response.data);

      if (response.status === 200 && response.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        // Store token if returned in response
        localStorage.setItem("authToken", response.data.token);
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
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

          <div className="email-group">

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              disabled={otpSent}
            />
            {!otpSent && (
              <button
                type="button"
                onClick={handleRequestOTP}
                className="otp-button"
                disabled={otpLoading}>
                  {otpLoading ? "Sending..." : "Get OTP"}
                </button>
            )}
            </div>
          </div>

          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp" className="form-label">
                OTP Verification
              </label>
              <input 
                type="text"
                id="otp"
                placeholder="Enter the OTP sent to your email"
                className="form-input"
                value={formData.otp}
                onChange={handleChange}
              />
            </div>
          )}

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

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={loading || !otpSent}
          >
            {loading ? "Signing Up..." : "Sign Up"}
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

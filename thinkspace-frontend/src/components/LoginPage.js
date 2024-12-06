import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {



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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #000000, #6a0dad)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          color: "#333",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#6a0dad" }}>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              aria-required="true"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1rem",
              }}
            />
            
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1rem",
              }}
            />
            
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#6a0dad",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          const [showPassword, setShowPassword] = React.useState(false);




        </form>
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#6a0dad", textDecoration: "none", fontWeight: "bold" }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

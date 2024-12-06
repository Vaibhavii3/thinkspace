import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const quote = "The best way to predict the future is to create it.";

  return (
    <div>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #000000, #6a0dad)",
          color: "#fff",
          textAlign: "center",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", background: "theme.secondary", }}>ThinkSpace</h1>
        <p
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            maxWidth: "600px",
            lineHeight: "1.8",
          }}
        >
          "{quote}"
        </p>
        <div style={{ marginTop: "2rem" }}>
          <Link
            to="/login"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6a0dad",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "1rem",
              textDecoration: "none",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
      </div>
  );
};

export default HomePage;

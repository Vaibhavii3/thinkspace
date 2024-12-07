import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const quote = "The best way to predict the future is to create it.";

  return (
    <div>
      <div className="homepage-container">
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", background: "theme.secondary", }}>ThinkSpace</h1>
        <p className="homepage-quote">
          "{quote}"
        </p>
        <div className="homepage-button-container">
          <Link
            to="/login"
            className="homepage-get-started-btn">
            Get Started
          </Link>
        </div>
      </div>
      </div>
  );
};

export default HomePage;

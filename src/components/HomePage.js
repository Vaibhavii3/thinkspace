import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const quote = "The best way to predict the future is to create it.";

  const themes = [
    { name: "Classic Light", primary: "#ffffff", secondary: "#f4f4f4" },
    { name: "Midnight Blue", primary: "#001f3f", secondary: "#001f3f" },
    { name: "Pastel Pink", primary: "#ffb6c1", secondary: "#ffe4e1" },
    { name: "Mint Green", primary: "#98ff98", secondary: "#e0ffe0" },
  ];


  return (
    <div>
      {/* Top Section */}
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
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>ThinkSpace</h1>
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

      {/* Themes Section */}
      <div id="themes" style={{ padding: "2rem 1rem", background: "#f4f4f4", minHeight: "100vh" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Preview Themes</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {themes.map((theme, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                background: theme.primary,
                color: theme.primary === "#ffffff" ? "#000" : "#fff",
              }}
            >
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                  {theme.name}
                </h3>
                <p>Explore how your notes will look in this theme.</p>
              </div>
              <div
                style={{
                  height: "200px",
                  background: theme.secondary,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#333",
                }}
              >
                <p style={{ fontSize: "1rem" }}>Notes Preview Here</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default HomePage;

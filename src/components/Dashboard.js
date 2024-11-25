import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [notesToday, setNotesToday] = useState(0);
  const [notesThisWeek, setNotesThisWeek] = useState(0);
  const [quickNote, setQuickNote] = useState("");
  const [quote, setQuote] = useState("");

  const quotes = [
    "The best way to predict the future is to create it.",
    "Dream big. Start small. Act now.",
    "Success is the sum of small efforts, repeated daily.",
    "Your limitation—it’s only your imagination.",
  ];

  // Simulate fetching stats
  useEffect(() => {
    // Replace these with actual API calls
    setNotesToday(5); // Example: 5 notes created today
    setNotesThisWeek(25); // Example: 25 notes created this week

    // Randomize quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  // Handle Quick Add Note
  const handleQuickAdd = () => {
    if (quickNote.trim()) {
      // Replace this with an API call to save the note
      alert(`Quick Note Added: "${quickNote}"`);
      setQuickNote(""); // Clear the input field
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        background: "linear-gradient(135deg, #f4f4f4, #ffffff)",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Welcome Section */}
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#6a0dad" }}>Welcome to ThinkSpace</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          "Your personal space for thoughts and ideas."
        </p>
      </header>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "2rem",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            background: "#6a0dad",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "8px",
            textAlign: "center",
            flex: "1",
            margin: "0 0.5rem",
          }}
        >
          <h3>Notes Today</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{notesToday}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            background: "#4a148c",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "8px",
            textAlign: "center",
            flex: "1",
            margin: "0 0.5rem",
          }}
        >
          <h3>Notes This Week</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{notesThisWeek}</p>
        </motion.div>
      </div>

      {/* Quick Add Section */}
      <div
        style={{
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#6a0dad" }}>Quick Add Note</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            placeholder="Write a quick note..."
            style={{
              flex: "1",
              maxWidth: "400px",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              marginRight: "0.5rem",
            }}
          />
          <button
            onClick={handleQuickAdd}
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "#6a0dad",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Inspirational Quote Section */}
      <div
        style={{
          textAlign: "center",
          padding: "1.5rem",
          background: "#f4f4f4",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ color: "#6a0dad", marginBottom: "1rem" }}>Today's Inspiration</h3>
        <p style={{ fontSize: "1.25rem", fontStyle: "italic", color: "#555" }}>"{quote}"</p>
      </div>
    </div>
  );
};

export default Dashboard;

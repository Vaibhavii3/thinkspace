import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSave, FaMagic } from "react-icons/fa";
import SavedNotes from "./SavedNotes";

const Dashboard = () => {
  const [text, setText] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [quote, setQuote] = useState("");
  const [notes, setNotes] = useState([]);
  

  const quotes = [
    "The best way to predict the future is to create it.",
    "Dream big. Start small. Act now.",
    "Success is the sum of small efforts, repeated daily.",
    "Your limitation—it’s only your imagination.",
  ];

    // Randomize quote
    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, []);

    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/notes");
          const data = await response.json();
          setNotes(data);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      };
    
      fetchNotes();
    }, []);
    
    const handleChange = (e) => {
      setText(e.target.value);
      setShowSaveButton(e.target.value.trim() !== "");
    };

    const handleSave = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });
    
        if (response.ok) {
          const newNote = await response.json(); // Get the newly created note
          setNotes((prevNotes) => [newNote, ...prevNotes]);
          setText(""); // Clear the editor
          setShowSaveButton(false);
        } else {
          alert("Failed to save the note.");
        }
      } catch (error) {
        console.error("Error saving the note:", error);
        alert("An error occurred while saving the note.");
      }
    };
    
  const user = {
    name: "thinkspace",
    profilePicture: "IMG/p.jpg",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Navigation Bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          background: "#6a0dad",
          color: "#fff",
          border: "2em",
          borderRadius: "3%",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ margin: 0 }}>ThinkSpace</h1>
        <div>
          <Link
            to="/pinned"
            style={{
              color: "#fff",
              margin: "0 1rem",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Pinned Notes
          </Link>
          <Link
            to="/archived"
            style={{
              color: "#fff",
              margin: "0 1rem",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Archived Notes
          </Link>
          <Link
            to="/saved-notes"
            style={{
              color: "#fff",
              margin: "0 1rem",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Saved Notes
          </Link>
        </div>

        <div>
        <Link to="/ProfilePage">
          <img
            src={user.profilePicture}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid #fff",
            }}
          />
        </Link>
      </div>

      </nav>
            {/* quote section  */}
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
    

      {/* Text Editor */}
      <div
        style={{
          padding: "2rem",
          minHeight: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          background: "#f4f4f4",
        }}
      >

        <textarea
          placeholder="Start writing here..."
          value={text}
          onChange={handleChange}
          style={{
            width: "100%",
            maxWidth: "800px",
            minHeight: "300px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            fontSize: "1rem",
            lineHeight: "1.6",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            outline: "none",
            resize: "none",
          }}
        />

        {/* Save Button */}
        {showSaveButton && (
          <button
            onClick={handleSave}
            style={{
              position: "absolute",
              top: "95px",
              right: "20px",
              background: "#6a0dad",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <FaSave style={{ marginRight: "0.5rem" }} />
            Save
          </button>
        )}

        {/* AI Generation Button */}
            <Link to="/AiGen">
              <button
                // onClick={() => alert("AI Generation Coming Soon!")}
                style={{
                  marginTop: "1rem",
                  background: "#ff9800",
                  color: "#fff",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
              >
                <FaMagic style={{ marginRight: "0.5rem" }} />
                AI Generate
              </button>
            </Link>
          </div>
          <SavedNotes notes={notes} />
    </div>
  );
};

export default Dashboard;


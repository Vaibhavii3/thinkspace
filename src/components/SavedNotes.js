import React, { useEffect, useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
const SavedNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/notes");
                const data = await response.json();
                setNotes(data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
            method: "DELETE",
          });
    
          if (response.ok) {
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // Remove deleted note from state
          } else {
            const errorData = await response.json();
            console.error("Delete failed:", errorData);
            alert("Failed to delete the note.");
          }
        } catch (error) {
          console.error("Error deleting the note:", error);
          alert("An error occurred while deleting the note.");
        }
      };


  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#6a0dad", marginBottom: "1rem" }}>Saved Notes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                width: "calc(33% - 2rem)",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                background: "#fff",
              }}
            >
              <p style={{ fontSize: "1rem", color: "#333" }}>{note.text}</p>
              <div>
                  {/* <button
                    onClick={() => handleView(note)}
                    style={{
                      background: "#00bcd4",
                      color: "#fff",
                      border: "none",
                      padding: "0.5rem",
                      marginRight: "0.5rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <FaEye />
                  </button> */}
              
                  <button
                    onClick={() => handleDelete(note._id)}
                    style={{
                      background: "#f44336",
                      color: "#fff",
                      border: "none",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
            </div>
          ))
        ) : (
          <p>No saved notes to display.</p>
        )}
      </div>
    </div>
  );

};

export default SavedNotes;
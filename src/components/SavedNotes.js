import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({ id: "", title: "", text: "" });

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

  const handleEditClick = (note) => {
    setEditNote({ id: note._id, title: note.title, text: note.text });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${editNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editNote.title,
          text: editNote.text,
        }),
      });

      if (response.ok) {
        const updatedNote = await response.json();
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
        );
        setIsEditing(false);
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#6a0dad", marginBottom: "1rem", textAlign: "center" }}>Saved Notes</h2>

      {isEditing ? (
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={editNote.title}
            onChange={(e) =>
              setEditNote((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            style={{
              marginBottom: "0.5rem",
              padding: "0.5rem",
              width: "100%",
              boxSizing: "border-box",
            }}
            placeholder="Edit Title"
          />
          <textarea
            value={editNote.text}
            onChange={(e) =>
                setEditNote((prev) => ({ ...prev, text: e.target.value }))
            }
            style={{
              marginBottom: "0.5rem",
              padding: "0.5rem",
              width: "100%",
              boxSizing: "border-box",
            }}
            placeholder="Edit Text"
          />
        
          <button
            onClick={handleSaveEdit}
            style={{
              marginRight: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-evenly",
          }}
        >
          {notes.map((note) => (
            <div
              key={note._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "1rem",
                marginBottom: "1rem",
                position: "relative",
                backgroundColor: "#fff",
                maxWidth: "300px",
                width: "100%",
                flex: "1 1 calc(33% - 1rem)",
                boxSizing: "border-box",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                  color: "#333",
                  borderBottom: "2px solid black",
                  paddingBottom: "0.5rem",
                }}
              >
                {note.title || "Untitled Note"}
              </h3>
              <p>{note.text}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <small>
                  Created: {new Date(note.createdAt).toLocaleString()}
                  {note.updatedAt &&
                  ` | Last Edited: ${new Date(note.updatedAt).toLocaleString()}`}
                </small>
                <div>
                  <button
                    onClick={() => handleEditClick(note)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(note._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedNotes;

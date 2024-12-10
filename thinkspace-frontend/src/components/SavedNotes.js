import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaThumbtack, FaArchive } from "react-icons/fa";
import axios from "axios";
import "../styles/saveNote.css";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [aiNotes, setAiNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({ id: "", title: "", text: "" });
  const [view, setView] = useState("normal");


  // fetch normal notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/notes");
        const data = await response.json();
        console.log("Fetched Notes:", data);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);


  // fetch ai-gen notes
//   useEffect(() => {
//     const fetchAiNotes = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/save-content`);
//             setAiNotes(response.data.notes || []);
//         } catch (error) {
//             console.error("Error fetching AI notes:", error);
//         }
//     };

//     fetchAiNotes();
// }, []);

  // deletion for normal note
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/v1/notes/${id}`, {
  //       method: "DELETE",
  //     });

  //   if (response.ok) {
  //     alert("Note deleted successfully");
  //   } else {
  //     alert("Failed to delete the note");
  //   }
  // } catch (error) {
  //   console.error("Error deleting the note:", error);
  // }
  // };

  const handleDelete = async (id, type = "normal") => {
    const url = type === "ai" 
      ? `${process.env.REACT_APP_API_URL}/delete-ai-note/${id}` 
      : `http://localhost:5000/api/v1/notes/${id}`;

    try {
      const response = await fetch(url, { method: "DELETE" });

      if (response.ok) {
        alert("Note deleted successfully");
        if (type === "ai") {
          setAiNotes(aiNotes.filter(note => note._id !== id));
        } else {
          setNotes(notes.filter(note => note._id !== id));
        }
      } else {
        alert("Failed to delete the note");
      }
    } catch (error) {
      console.error("Error deleting the note:", error);
    }
  };

  //normal 
  const handleEditClick = (note) => {
    setEditNote({ id: note._id, title: note.title, text: note.text });
    setIsEditing(true);
  };

  //normal
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/notes/${editNote.id}`, {
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
      alert("Note updated successfully");
      setIsEditing(false);
    } else {
      alert("Failed to update the note");
    }
  } catch (error) {
    console.error("Error updating the note:", error);
  }
  };

  // const handleSaveAiNote = async (aiNote) => {
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/save-content`, aiNote);
  //     if (response.status === 200) {
  //       alert("AI Note saved successfully!");
  //       setAiNotes((prev) => [...prev, response.data.note]);
  //     }
  //   } catch (err) {
  //     console.error("Error saving AI note:", err);
  //   }
  // };

  return (

  <div className="saved-notes-container">
    <div className="saved-notes-title" >
      <h1> Saved Notes </h1>
    </div>

    {/* Toggle Buttons */}
    <div className="toggle-buttons">

        <button
          className={`toggle-button ${view === "normal" ? "active" : ""}`}
          onClick={() => setView("normal")}
        >
          Normal Notes
        </button>

        <button
          className={`toggle-button ${view === "ai" ? "active" : ""}`}
          onClick={() => setView("ai")}
        >
          AI-Generated Notes
        </button>

      </div>

  {view === "normal" && (
    <div>
      {isEditing ? (
        <div className="edit-note-form">
          <input
            type="text"
            value={editNote.title}
            onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
            placeholder="Edit Title"
            className="input"
          />
          <textarea
            value={editNote.text}
            onChange={(e) => setEditNote({ ...editNote, text: e.target.value })}
            placeholder="Edit Text"
            className="input"
          />
          <button onClick={handleSaveEdit} className="edit-btn">Save</button>
          <button onClick={() => setIsEditing(false)} className="delete-btn">Cancel</button>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note._id} className="note-box">
                <h3>{note.title}</h3>
                <p>{note.text}</p>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => handleEditClick(note)}><FaEdit /></button>
                  <button className="delete-btn" onClick={() => handleDelete(note._id)}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>  
      )}
    </div>
  )}

    {view === "ai" && (
            <div className="notes-grid">
              {aiNotes.map((note) => (
                <div key={note._id} className="note-box">
                  <h3>{note.title}</h3>
                  <p>{note.text}</p>
                  <div className="buttons">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(note._id, "ai")}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
    </div>
  );
};

export default SavedNotes;



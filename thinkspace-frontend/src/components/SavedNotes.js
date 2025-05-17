import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import "../styles/saveNote.css";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [aiNotes, setAiNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({ id: "", title: "", text: "" });
  const [view, setView] = useState("normal");

  //fetch notes
  useEffect (() => {
    const fetchNotes = async () => {
      try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
            setNotes(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  

  // fetch ai-gen notes
  useEffect(() => {
    const fetchAiNotes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/ai-notes`);
            setAiNotes(response.data.notes || []);
        } catch (error) {
            console.error("Error fetching AI notes:", error);
        }
    };

    fetchAiNotes();
  }, []);


  // deletion for normal note
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/notes/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (response.status === 200) {
  //     setNotes((prev) => prev.filter((note) => note._id !== id));
  //     alert("Note deleted successfully");
  //     }
  // } catch (error) {
  //   console.error("Error deleting the note:", error);
  // }
  // };

  // const handleDelete = async (id, type = "normal") => {
  //   try {
  //     const endpoint = type === "ai" 
  //       ? `${process.env.REACT_APP_API_URL}/v1/ai-notes/${id}`
  //       : `${process.env.REACT_APP_API_URL}/v1/notes/${id}`;
  
  //     const response = await fetch(endpoint, { method: "DELETE" });
  
  //     if (response.status === 200) {
  //       if (type === "normal") {
  //         setNotes((prev) => prev.filter((note) => note._id !== id));
  //       } else {
  //         setAiNotes((prev) => prev.filter((note) => note._id !== id));
  //       }
  //       alert("Note deleted successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting the note:", error);
  //   }
  // };

  // Fix handleDelete
const handleDelete = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setNotes((prev) => prev.filter((note) => note._id !== id));
      alert("Note deleted successfully");
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
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${editNote.id}`, 
        {
          title: editNote.title,
          text: editNote.text,
        }
      );

    if (response.status === 200) {
      // const updatedNote = response.data;
      setNotes((prev) => 
        prev.map((note) => (note._id === editNote.id ? response.data : note))
      );
      alert("Note updated successfully");
      setIsEditing(false);
    }
  } catch (error) {
    console.error("Error updating the note:", error);
  }
  };


  return (

  <div className="saved-notes-container">
    <div className="saved-notes-title" >
      <h1> Your Notes </h1>
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
          {/* <input
            type="text"
            value={editNote.title}
            onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
            placeholder="Edit Title"
            className="input"
          /> */}
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
          {
          notes.length === 0 ? <p> No saved notes available. </p> :
          notes.map((note) => (
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
              {
              aiNotes.length === 0 ? <p> No Ai Notes available. </p> :
              aiNotes.map((note) => (
                <div key={note._id} className="note-box">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
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



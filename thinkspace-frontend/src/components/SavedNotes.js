import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import "../styles/saveNote.css";
import toast from "react-hot-toast";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [aiNotes, setAiNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({ id: "", title: "", text: "" });
  const [view, setView] = useState("normal");
  const [selectedNote, setSelectedNote] = useState(null);

  //fetch notes
  useEffect (() => {
    const fetchNotes = async () => {
      try {
            const token = localStorage.getItem("authToken");
            if (!token) {
              console.error("No token found");
              return;
            }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
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
          const token = localStorage.getItem("authToken");
            if (!token) {
              console.error("No token found");
              return;
            }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/ai-notes`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setAiNotes(response.data.notes || []);
        } catch (error) {
            console.error("Error fetching AI notes:", error);
        }
    };

    fetchAiNotes();
  }, []);

const handleDelete = async (id, type = "normal") => {

  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No token found");
    return;
  }
  
  const endpoint = type === "ai" 
  ? `${process.env.REACT_APP_API_URL}/ai-notes/${id}`
  : `${process.env.REACT_APP_API_URL}/notes/${id}`;
  
  try {
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      if (type === 'ai') {
        setAiNotes((prev) => prev.filter((note) => note._id !== id)); 
      } else {
        setNotes((prev) => prev.filter((note) => note._id !== id)); 
      }
      toast.success("Note deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting the note:", error);
    toast.error("Failed to delete the note. Please try again.")
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
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${editNote.id}`, 
        {
          title: editNote.title,
          text: editNote.text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    if (response.status === 200) {
      setNotes((prev) => 
        prev.map((note) => (note._id === editNote.id ? response.data : note))
      );
      toast.success("Note updated successfully");
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
          {
          notes.length === 0 ? <p> No saved notes available. </p> :
          notes.map((note) => (
            <div key={note._id} className="note-box" >
                <h3>{note.title}</h3>
                <p onClick={() => setSelectedNote(note)}>{note.text}</p>
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
                  <p onClick={() => setSelectedNote(note)}>{note.content}</p>
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

      {/* model-style detail view  */}
      {selectedNote && (
        <div className="note-detail-modal">
          <div className="note-detail-box">
            <h2 className="model-title">{selectedNote.title}</h2>
            <p className="model-title">{selectedNote.text || selectedNote.content}</p>
            <button className="close-btn" onClick={() => setSelectedNote(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SavedNotes;



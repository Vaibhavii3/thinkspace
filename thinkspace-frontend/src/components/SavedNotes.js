import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaThumbtack, FaArchive } from "react-icons/fa";
import axios from "axios";
import "../styles/saveNote.css";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [aiNotes, setAiNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({ id: "", title: "", text: "" });
  const [view, setView] = useState("normal");

  //fetch notes
  useEffect (() => {
    const fetchNotes = async () => {
      try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/notes`);
            setNotes(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  //fetch archive notes
  useEffect (() => {
    const fetchArchivedNotes = async () => {
      try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/notes/archived`);
            setArchivedNotes(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchArchivedNotes();
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


  // fetch pin notes
  useEffect (() => {
    const fetchPinnedNotes = async () => {
      try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/notes/pinned`);
            setPinnedNotes(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchPinnedNotes();
  }, []);



    // archive note 2
    const handleArchive = async (noteId) => {

      try {
        // const response = await axios.post(`http://localhost:5000/api/v1/notes/archived`, { id: noteId });
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/notes/archive`, { id: noteId });
        if (response.status === 200) {
          const updatedNote = response.data.note;
          setNotes((prev) => prev.filter((note) => note.id !== noteId));
          setArchivedNotes((prev) => [...prev, updatedNote]);
        }
      } catch (error) {
        console.error("Error archiving note:", error);
      }
    };


   // Pin a note 1
  //   const handlePin = async (id) => {
  //     try {
  //       const response = await fetch(`http://localhost:5000/api/v1/notes/pin`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ id }),
  //       });

  //       if (response.ok) {
  //         setNotes(notes.filter((note) => note._id !== id)); 
  //         alert("Note pinned successfully");
  //       } else {
  //         alert("Failed to pin the note");
  //       }
  //     } catch (error) {
  //       console.error("Error pinning the note:", error);
  //     }
  // };

  //pin note 2 
  const handlePin = async(noteId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/notes/pin`, { id: noteId });
      if (response.status === 200) {
        const updatedNote = response.data.note;
        setNotes((prev) => prev.filter((note) => note.id !== noteId));
        setPinnedNotes((prev) => [...prev, updatedNote]);
      }
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

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
    const url = 
    type === "ai" 
      ? `${process.env.REACT_APP_API_URL}/delete-ai-note/${id}` 
      : `${process.env.REACT_APP_API_URL}/v1/notes/${id}`;

    try {
      const response = await axios.delete(url);

      if (response.status === 200) {
        alert("Note deleted successfully");
        if (type === "ai") {
          setAiNotes((prev) => prev.filter((note) => note._id !== id));
        } else {
          setNotes((prev) => prev.filter((note) => note._id !== id));
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
    setEditNote({ id: note.id, title: note.title, text: note.text });
    setIsEditing(true);
  };

  //normal
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/v1/notes/${editNote.id}`, 
        {
          title: editNote.title,
          text: editNote.text,
        }
      );

    if (response.status === 200) {
      const updatedNote = response.data;
      setNotes((prev) => 
        prev.map((note) => (note._id === editNote.id ? updatedNote : note))
      );
      alert("Note updated successfully");
      setIsEditing(false);
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

        <button 
          className={`toggle-button ${view === "archived" ? "active" : ""}`} onClick={() => setView("archived")}>
            archived Notes 
        </button>

        <button 
          className={`toggle-button ${view === "pinned" ? "active" : ""}`} onClick={() => setView("pinned")}>
            Pinned Notes 
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
            <div key={note._id} className="note-box">
                <h3>{note.title}</h3>
                <p>{note.text}</p>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => handleEditClick(notes)}><FaEdit /></button>

                  <button className="pin-btn" onClick={() => handlePin(notes.id)}> <FaThumbtack /></button>

                  <button className="archve-btn" onClick={() => handleArchive(notes.id)}> <FaArchive /></button>

                  <button className="delete-btn" onClick={() => handleDelete(notes._id)}><FaTrash /></button>
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
                <div key={note.id} className="note-box">
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

    {view === "archived" && (
      <div className="notes-grid">
        {
        archivedNotes.length === 0 ? <p> No archived notes available. </p> :
        archivedNotes.map((note) => (
          <div key={note._id} className="note-box">
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            {/* <button className="archve-btn" onClick={() => handleArchive(note._id)}><FaArchive /></button> */}
            </div>
        ))}
      </div>
    )}

    {view === "pinned" && (
      <div className="notes-grid">
        {
        pinnedNotes.length === 0 ? <p> No pinned notes available. </p> :
        pinnedNotes.map((note) => (
          <div key={note._id} className="note-box">
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            {/* Buttons */}
          </div>
        ))}
      </div>
    )}


    </div>
  );
};

export default SavedNotes;



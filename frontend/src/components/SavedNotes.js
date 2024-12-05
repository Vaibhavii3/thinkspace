import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaThumbtack, FaArchive } from "react-icons/fa";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({ id: "", title: "", text: "" });



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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/notes/${id}`, {
        method: "DELETE",
      });

    if (response.ok) {
      alert("Note deleted successfully");
    } else {
      alert("Failed to delete the note");
    }
  } catch (error) {
    console.error("Error deleting the note:", error);
  }
  };

  const handleEditClick = (note) => {
    setEditNote({ id: note._id, title: note.title, text: note.text });
    setIsEditing(true);
  };

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

  return (

  <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editNote.title}
            onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
            placeholder="Edit Title"
          />
          <textarea
            value={editNote.text}
            onChange={(e) => setEditNote({ ...editNote, text: e.target.value })}
            placeholder="Edit Text"
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        notes.map((note) => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <button onClick={() => handleEditClick(note)}><FaEdit /></button>
            <button onClick={() => handleDelete(note._id)}><FaTrash /></button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedNotes;

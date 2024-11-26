import React, { useState } from "react";

const NoteCard = ({ note, onArchive }) => {
    return (
      <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <button
          onClick={() => onArchive(note.id)}
          style={{
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer",
          }}
        >
          Archive
        </button>
      </div>
    );
  };
  
  const ArchiveFeature = () => {
    const [notes, setNotes] = useState([
      { id: 1, title: "Note 1", content: "This is note 1", isArchived: false },
      { id: 2, title: "Note 2", content: "This is note 2", isArchived: false },
    ]);
  
    const handleArchive = (id) => {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, isArchived: true } : note
      );
      setNotes(updatedNotes);
    };
  
    return (
      <div>
        <h2>Active Notes</h2>
        {notes.filter((note) => !note.isArchived).map((note) => (
          <NoteCard key={note.id} note={note} onArchive={handleArchive} />
        ))}
  
        <h2>Archived Notes</h2>
        {notes.filter((note) => note.isArchived).map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    );
  };
  
  export default ArchiveFeature;
  
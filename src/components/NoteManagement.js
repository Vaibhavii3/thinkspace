import React, { useState } from "react";

const NoteCard = ({ note, onPin }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button
        onClick={() => onPin(note.id)}
        style={{
          background: note.isPinned ? "#ffd700" : "#ccc",
          color: "#000",
          border: "none",
          padding: "0.5rem",
          cursor: "pointer",
        }}
      >
        {note.isPinned ? "Unpin" : "Pin"}
      </button>
    </div>
  );
};

const NoteManagement = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1", content: "This is note 1", isPinned: false },
    { id: 2, title: "Note 2", content: "This is note 2", isPinned: false },
  ]);

  const handlePin = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <div>
      <h2>Pinned Notes</h2>
      {notes.filter((note) => note.isPinned).map((note) => (
        <NoteCard key={note.id} note={note} onPin={handlePin} />
      ))}

      <h2>Other Notes</h2>
      {notes.filter((note) => !note.isPinned).map((note) => (
        <NoteCard key={note.id} note={note} onPin={handlePin} />
      ))}
    </div>
  );
};

export default NoteManagement;

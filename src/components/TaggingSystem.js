import React, { useState } from "react";

const TaggingSystem = () => {
    const [notes, setNotes] = useState([
      { id: 1, title: "Note 1", content: "This is note 1", tags: ["Work"] },
      { id: 2, title: "Note 2", content: "This is note 2", tags: ["Personal"] },
    ]);
  
    const [filterTag, setFilterTag] = useState("");
  
    const handleAddTag = (id, tag) => {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, tags: [...note.tags, tag] } : note
      );
      setNotes(updatedNotes);
    };
  
    return (
      <div>
        <h2>Filter by Tag</h2>
        <input
          type="text"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          placeholder="Enter tag to filter"
        />
        <div>
          {notes
            .filter((note) => !filterTag || note.tags.includes(filterTag))
            .map((note) => (
              <div key={note.id} style={{ marginBottom: "1rem" }}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <p>Tags: {note.tags.join(", ")}</p>
                <button onClick={() => handleAddTag(note.id, "New Tag")}>
                  Add Tag
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  };
  
  export default TaggingSystem;
  
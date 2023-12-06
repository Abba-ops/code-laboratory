import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

export default function CreateArea({ addNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
      id: crypto.randomUUID(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({
      title: "",
      content: "",
    });
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-note">
        {isExpanded && (
          <input
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
          />
        )}
        <textarea
          name="content"
          onFocus={handleFocus}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          value={note.content}
          onChange={handleChange}
        />
        {isExpanded && (
          <Zoom in={isExpanded}>
            <Fab as="button">
              <AddIcon />
            </Fab>
          </Zoom>
        )}
      </form>
    </div>
  );
}

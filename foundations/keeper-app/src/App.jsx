import { useState } from "react";
import CreateArea from "./components/CreateArea";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (note) => {
    setNotes((prev) => {
      const currentNotes = [...prev, note];
      localStorage.setItem("notes", JSON.stringify(currentNotes));
      return currentNotes;
    });
  };

  const handleDeleteNote = (id) => {
    const currentNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(currentNotes));
    setNotes(currentNotes);
  };

  useEffect(() => {
    if (localStorage.getItem("notes")) {
      const localNotes = JSON.parse(localStorage.getItem("notes"));
      setNotes(localNotes);
    }
  }, []);

  return (
    <>
      <Header />
      <CreateArea addNote={handleAddNote} />
      {notes.map((note) => (
        <Note {...note} key={note.id} deleteNote={handleDeleteNote} />
      ))}
      <Footer />
    </>
  );
}

export default App;

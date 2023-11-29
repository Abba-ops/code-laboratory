import { BookContext } from "../context/BookContext";
import { useContext, useState } from "react";

export default function NewBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { dispatch } = useContext(BookContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "addBook",
      book: { title, author, id: crypto.randomUUID() },
    });
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="text"
        value={title}
        placeholder="Enter book title here..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        required
        type="text"
        value={author}
        placeholder="Enter author here..."
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input type="submit" value="Add Book" />
    </form>
  );
}

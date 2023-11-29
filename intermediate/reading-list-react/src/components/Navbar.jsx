import { BookContext } from "../context/BookContext";
import { useContext } from "react";

export default function Navbar() {
  const { books } = useContext(BookContext);
  return (
    <div className="navbar">
      <h1>Book Reading List</h1>
      <p>Currently you have {books.length} books to get through...</p>
    </div>
  );
}

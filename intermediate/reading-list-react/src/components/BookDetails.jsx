import { BookContext } from "../context/BookContext";
import { useContext } from "react";

export default function BookDetails({ book }) {
  const { dispatch } = useContext(BookContext);
  return (
    <li onClick={() => dispatch({ type: "removeBook", id: book.id })}>
      <div className="title">{book.title}</div>
      <div className="author">{book.author}</div>
    </li>
  );
}

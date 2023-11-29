import { BookContext } from "../context/BookContext";
import BookDetails from "./BookDetails";
import { useContext } from "react";

export default function BookList() {
  const { books } = useContext(BookContext);
  return books.length ? (
    <div className="book-list">
      <ul>
        {books.map((book) => {
          return <BookDetails key={book.id} book={book} />;
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">No book to read. Just chill and have fun!</div>
  );
}

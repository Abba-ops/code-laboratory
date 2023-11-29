import { useRef } from "react";

export default function SearchTodo({ handleSearch }) {
  const inputRef = useRef();
  const handleChange = (e) => {
    const enteredText = inputRef.current.value;
    e.preventDefault();
    handleSearch(enteredText);
  };

  return (
    <div className="search-wrapper">
      <h3>Search Todo</h3>
      <input
        id="search"
        type="search"
        name="search"
        ref={inputRef}
        className="search-input"
        onChange={handleChange}
        placeholder="Search todo items here"
      />
    </div>
  );
}

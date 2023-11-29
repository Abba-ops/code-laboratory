import { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

export default function TodoForm({ getNewTodo, editData }) {
  const inputRef = useRef();
  const handleSubmit = (e) => {
    let enteredInput = inputRef.current.value;
    e.preventDefault();
    const newTodo = {
      id: editData ? editData.id : uuid(),
      text: enteredInput.trim(),
    };
    if (enteredInput.length) {
      getNewTodo(newTodo);
    }
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length !== 0) {
      inputRef.current.value = editData.text;
    }
  }, [editData]);

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        id="input"
        type="text"
        name="input"
        ref={inputRef}
        className="todo-input"
        placeholder="Enter a todo item here"
      />
      <button type="submit" className="todo-button">
        {editData ? "Save Todo" : "Add Todo"}
      </button>
    </form>
  );
}

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TodoItem({ items, editTodo, deleteTodo }) {
  return (
    <>
      {items.map((item, index) => (
        <div key={`${item.id}${index}`} className="todo-item-wrapper">
          <p className="todo-text">{item.text}</p>
          <div className="icons">
            <MdDelete
              className="delete-icon"
              onClick={() => deleteTodo(item.id)}
            />
            <FaRegEdit className="edit-icon" onClick={() => editTodo(item)} />
          </div>
        </div>
      ))}
    </>
  );
}

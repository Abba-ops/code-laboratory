import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import SearchTodo from "./SearchTodo";

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const handleNewTodo = (todo) => {
    const todoIndex = items.findIndex((item) => item.id === todo.id);
    if (todoIndex === -1) {
      setItems((items) => {
        const todoItems = [...items, todo];
        localStorage.setItem("todoItems", JSON.stringify(todoItems));
        return todoItems;
      });
    } else {
      setItems((items) => {
        const todoItems = items.map((item) => {
          if (item.id === todo.id) {
            return { ...todo };
          } else {
            return item;
          }
        });
        localStorage.setItem("todoItems", JSON.stringify(todoItems));
        return todoItems;
      });
      setEditData(null);
    }
  };

  const editTodo = (item) => {
    setEditData(item);
  };

  const deleteTodo = (id) => {
    setItems((items) => {
      const todoItems = items.filter((item) => item.id !== id);
      localStorage.setItem("todoItems", JSON.stringify(todoItems));
      return todoItems;
    });
  };

  const handleSearch = (item) => {
    setSearchTerm(item);
  };

  const filterItems =
    items && items.length
      ? items.filter((item) => item.text.toLowerCase().includes(searchTerm))
      : [];

  useEffect(() => {
    if (localStorage.getItem("todoItems")) {
      setItems(JSON.parse(localStorage.getItem("todoItems")));
    }
  }, []);

  return (
    <div className="todo-list">
      <SearchTodo handleSearch={handleSearch} />
      <TodoForm getNewTodo={handleNewTodo} editData={editData} />
      {items && items.length ? (
        <TodoItem
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          items={searchTerm ? filterItems : items}
        />
      ) : (
        <p className="no-todo">No todo item currently</p>
      )}
      {searchTerm && !filterItems.length ? (
        <p className="no-todo">No to-dos found</p>
      ) : null}
    </div>
  );
}

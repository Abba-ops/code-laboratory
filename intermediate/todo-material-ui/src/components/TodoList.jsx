import { Box, Grid, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const [items, setItems] = useState(() => {
    if (localStorage.getItem("items")) {
      return JSON.parse(localStorage.getItem("items"));
    } else {
      return [];
    }
  });

  const removeTodo = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleTodo = (id) => {
    setItems((items) => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
    });
  };

  const addTodo = (text) => {
    setItems((items) => [
      ...items,
      { text: text, completed: false, id: crypto.randomUUID() },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <Box my={2}>
      <Grid container justifyContent={"center"}>
        <Grid item md={7}>
          <List>
            {!items.length ? (
              <Box sx={{ textAlign: "center" }} m={3}>
                <Typography variant="body1" component={"div"}>
                  No to-dos
                </Typography>
              </Box>
            ) : (
              items.map((item) => (
                <TodoItem
                  removeTodo={() => removeTodo(item.id)}
                  toggleTodo={() => toggleTodo(item.id)}
                  key={item.id}
                  todo={item}
                />
              ))
            )}
            <TodoForm addTodo={addTodo} />
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

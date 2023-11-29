import {
  IconButton,
  InputAdornment,
  ListItem,
  OutlinedInput,
} from "@mui/material";
import { Create } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from "prop-types";

TodoForm.propTypes = {
  addTodo: PropTypes.func,
};

export default function TodoForm({ addTodo }) {
  const [textField, setTextField] = useState("");

  const handleChange = (e) => {
    setTextField(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(textField);
    setTextField("");
  };

  return (
    <ListItem>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <OutlinedInput
          fullWidth
          size="small"
          value={textField}
          onChange={handleChange}
          placeholder="Create Todo"
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <Create />
              </IconButton>
            </InputAdornment>
          }
        />
      </form>
    </ListItem>
  );
}

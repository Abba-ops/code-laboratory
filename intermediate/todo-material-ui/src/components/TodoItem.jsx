import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import PropTypes from "prop-types";

TodoItem.propTypes = {
  todo: PropTypes.object,
  removeTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
};

export default function TodoItem({ todo, removeTodo, toggleTodo }) {
  const labelId = `checkbox-list-label-${todo.id}`;

  return (
    <>
      <ListItem
        key={todo.id}
        secondaryAction={
          <IconButton onClick={removeTodo} edge="end">
            <Delete />
          </IconButton>
        }
        disablePadding>
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              onChange={toggleTodo}
              checked={todo.completed}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={todo.text} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

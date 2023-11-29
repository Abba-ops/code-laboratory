import { CssBaseline } from "@mui/material";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <TodoList />
      <CssBaseline />
    </>
  );
}

export default App;

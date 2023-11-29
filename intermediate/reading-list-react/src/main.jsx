import ReactDOM from "react-dom/client";
import BookContextProvider from "./context/BookContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BookContextProvider>
    <App />
  </BookContextProvider>
);

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { FavoritesContextProvider } from "./store/favorites-context.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FavoritesContextProvider>
    <Router>
      <App />
    </Router>
  </FavoritesContextProvider>
);

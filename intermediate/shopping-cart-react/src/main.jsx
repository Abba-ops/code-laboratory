import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CartContextProvider from "./context/CartContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartContextProvider>
);

import { CartContext } from "../context/CartContext";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  return (
    <ul className={classes.navWrapper}>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li className={classes.cartNavLink}>
        <Link to={"/cart"}>
          Cart <span>{cartItems.length}</span>
        </Link>
      </li>
    </ul>
  );
}

import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import classes from "./Cart.module.css";
import { useContext } from "react";

export default function Cart() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className={classes.cartWrapper}>
      {!cartItems.length && <p className={classes.loading}>Cart is empty</p>}
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} product={cartItem} />
      ))}
    </div>
  );
}

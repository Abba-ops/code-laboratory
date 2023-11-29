import { CartContext } from "../context/CartContext";
import classes from "./CartItem.module.css";
import { useContext } from "react";

export default function CartItem({ product }) {
  const { dispatch } = useContext(CartContext);
  return (
    <div className={classes.cartItemWrapper}>
      <img
        className={classes.cartImage}
        src={product.image}
        alt={product.category}
      />
      <p className={classes.cartTitle}>{product.title}</p>
      <p>{product.price}</p>
      <div className={classes.cartQuantityWrapper}>
        <button
          disabled={product.quantity === 1}
          onClick={() =>
            dispatch({ type: "REMOVE_FROM_CART", reduce: product.id })
          }>
          -
        </button>
        <div>{product.quantity}</div>
        <button onClick={() => dispatch({ type: "ADD_TO_CART", product })}>
          +
        </button>
      </div>
      <button
        className={classes.cartRemoveButton}
        onClick={() =>
          dispatch({ type: "REMOVE_FROM_CART", remove: product.id })
        }>
        Remove from Cart
      </button>
    </div>
  );
}

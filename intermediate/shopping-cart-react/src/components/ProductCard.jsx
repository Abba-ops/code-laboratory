import { CartContext } from "../context/CartContext";
import classes from "./ProductCard.module.css";
import { useContext } from "react";

export default function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);
  const { category, image, price, rating, title } = product;
  return (
    <div className={classes.productCardWrapper}>
      <img className={classes.productCardImage} src={image} alt={category} />
      <div className={classes.productCardText}>{category}</div>
      <div className={classes.productCardTitle}>{title}</div>
      <div className={classes.productCardText}>{price}</div>
      <div className={classes.productCardText}>{rating.rate}</div>
      <button
        className={classes.productCardButton}
        onClick={() => dispatch({ type: "ADD_TO_CART", product })}>
        Add to Cart
      </button>
    </div>
  );
}

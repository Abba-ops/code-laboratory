import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import classes from "./Home.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function getProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const products = await res.json();
      if (products && products.length) {
        setProducts(products);
        setIsLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <div className={classes.productWrapper}>
      {isLoading ? (
        <div className={classes.loading}>Loading...</div>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

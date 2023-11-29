import { cartReducer } from "../reducers/cartReducer";
import { createContext, useReducer } from "react";

const initialState = {
  cartItems: [],
};

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

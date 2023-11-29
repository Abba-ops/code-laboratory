export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product } = action;
      const { cartItems } = state;
      const itemIndex = cartItems.findIndex((item) => item.id === product.id);
      if (itemIndex === -1) {
        return {
          ...state,
          cartItems: [...cartItems, { ...product, quantity: 1 }],
        };
      } else {
        const item = cartItems.find(
          (item) => item.id === cartItems[itemIndex].id
        );
        cartItems[itemIndex] = { ...item, quantity: item.quantity + 1 };
        return { ...state, cartItems };
      }
    }
    case "REMOVE_FROM_CART": {
      const { reduce, remove } = action;
      const { cartItems } = state;
      if (remove) {
        const newCartItems = cartItems.filter(
          (cartItem) => cartItem.id !== remove
        );
        console.log(newCartItems);
        return { ...state, cartItems: newCartItems };
      } else {
        const newCartItems = cartItems.map((cartItem) => {
          if (cartItem.id === reduce) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          } else {
            return { ...cartItem };
          }
        });
        return { ...state, cartItems: newCartItems };
      }
    }
    default:
      return state;
  }
};

export const bookReducer = (state, action) => {
  switch (action.type) {
    case "addBook":
      return [...state, action.book];
    case "removeBook":
      return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
};

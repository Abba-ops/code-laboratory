import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: () => {},
  removeFavorite: () => {},
  itemIsFavorite: () => {},
});

export function FavoritesContextProvider({ children }) {
  const [userFavorites, setUserFavorites] = useState(() => {
    if (
      JSON.parse(localStorage.getItem("favorites")) &&
      JSON.parse(localStorage.getItem("favorites")).length
    ) {
      return JSON.parse(localStorage.getItem("favorites"));
    } else {
      return [];
    }
  });

  const addFavoriteHandler = (favoriteMeetup) => {
    setUserFavorites((prevUserFavorites) => {
      const favorites = prevUserFavorites.concat(favoriteMeetup);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      return favorites;
    });
  };

  const removeFavoriteHandler = (meetupId) => {
    setUserFavorites((prevUserFavorites) => {
      const favorites = prevUserFavorites.filter(
        (favoriteMeetup) => favoriteMeetup.id !== meetupId
      );
      localStorage.setItem("favorites", JSON.stringify(favorites));
      return favorites;
    });
  };

  const itemIsFavoriteHandler = (meetupId) => {
    const itemIsFavorite = userFavorites.some(
      (favoriteMeetup) => favoriteMeetup.id === meetupId
    );
    return itemIsFavorite;
  };

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;

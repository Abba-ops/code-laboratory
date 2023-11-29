import MeetupList from "../components/meetups/MeetupList";
import FavoritesContext from "../store/favorites-context";
import { useContext } from "react";

export default function Favorite() {
  const favoriteCtx = useContext(FavoritesContext);
  let content;
  if (favoriteCtx.totalFavorites === 0) {
    content = <p>You do not have any favorites yet. Start adding some?</p>;
  } else {
    content = <MeetupList meetups={favoriteCtx.favorites} />;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

import { FavoritesRow } from "../../components/FavoritesRow";
import styles from "../../styles/Favorites.module.css";
import Header from "../../components/Header";
import { useFavorites } from "../../hooks/use-favorites";
import { ArtObject } from "../art-posts/[objectId]";

const Favorites = () => {
  const [favorites, addFavorite, removeFavorite] = useFavorites();

  return (
    <div>
      <Header />
      <div className={styles.favorites}>
        <h2>Favorites</h2>
        <div>{`Navigate to a favorited art post by clicking the row's arrow icon.`}</div>
        <div>{`Unfavorite an art post by clicking the row's heart icon.`}</div>
        {favorites.map((favorite: ArtObject) => (
          <FavoritesRow
            item={favorite}
            removeFavorite={removeFavorite}
            key={favorite.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;

import { FavoritesRow } from "../../components/FavoritesRow";
import styles from "../../styles/Favorites.module.css";
import Header from "../../components/Header";
import { useFavorites } from "../../hooks/use-favorites";
import { ArtObject } from "../../utils/types";
import { NextPage } from "next";

const Favorites: NextPage = () => {
  const [favorites, addFavorite, removeFavorite] = useFavorites();

  return (
    <div>
      <Header />
      <div className={styles.favorites}>
        <h2>Favorites</h2>
        {favorites.length > 0 && (
          <main>
            <div>{`Navigate to a favorited art post by clicking the row's arrow icon.`}</div>
            <div>{`Unfavorite an art post by clicking the row's heart icon.`}</div>
            {favorites.length > 0 &&
              favorites.map((favorite: ArtObject) => (
                <FavoritesRow
                  item={favorite}
                  removeFavorite={removeFavorite}
                  key={favorite.id}
                />
              ))}
          </main>
        )}
        {favorites.length <= 0 && (
          <main>
            <div>No favorites yet!</div>
          </main>
        )}
      </div>
    </div>
  );
};

export default Favorites;

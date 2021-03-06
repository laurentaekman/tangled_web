import Head from "next/head";
import { FavoritesRow } from "../../components/FavoritesRow";
import { Notification } from "../../components/Notification";
import styles from "../../styles/pages/Favorites.module.css";
import Header from "../../components/Header";
import { useFavorites } from "../../hooks/use-favorites";
import { ArtObject } from "../../utils/types";
import { NextPage } from "next";
import { EmptyState } from "../../components/EmptyState";

const Favorites: NextPage = () => {
  //Using custom hook to retrieve user-specific favorites, as well as update functions and error-management while fetching
  const [
    favorites,
    addFavorite,
    removeFavorite,
    isLoadingFavorites,
    error,
    dismissError,
  ] = useFavorites();

  return (
    <div>
      <Head>
        <title>Art Crawl</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.favorites}>
        {error && (
          <Notification isError={true} message={error} onClose={dismissError} />
        )}
        <h1>Favorites</h1>
        {favorites.length > 0 && (
          <main>
            <div className={styles.favorites_description}>
              <div>{`Navigate to a favorited art post by clicking the row's arrow icon.`}</div>
              <div>{`Unfavorite an art post by clicking the row's heart icon.`}</div>
            </div>
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
        {isLoadingFavorites && <div className={styles.loader}></div>}
        {!favorites.length && !isLoadingFavorites && (
          <main>
            <EmptyState message="No favorites yet!" />
          </main>
        )}
      </main>
    </div>
  );
};

export default Favorites;

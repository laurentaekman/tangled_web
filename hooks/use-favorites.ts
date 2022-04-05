import { useEffect, useRef, useState } from "react";
import { ArtObject } from "../utils/types";
import { getArtObjects } from "../utils/api";
import {
  grabFavoritesFromStorage,
  setFavoritesInStorage,
} from "../utils/storage";

export const useFavorites = (): any[] => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<ArtObject[]>([]);
  const [error, setError] = useState<any>();
  let notFirstRender = useRef(false);

  useEffect(() => {
    setFavoriteIds(grabFavoritesFromStorage());
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const objects = await getArtObjects(favoriteIds);
        setFavorites(objects);
      } catch (error) {
        setError("Couldn't fetch favorite objects.");
      }
    };
    if (favoriteIds.length > 0) {
      fetchFavorites();
    } else if (notFirstRender.current) {
      setFavorites([]);
    }
  }, [favoriteIds]);

  useEffect(() => {
    if (notFirstRender.current) {
      setFavoritesInStorage(favoriteIds);
    } else {
      notFirstRender.current = true;
    }
  }, [favoriteIds]);

  const addFavorite = (objectId: number) => {
    setFavoriteIds((previousFavorites) => [...previousFavorites, objectId]);
  };

  const removeFavorite = (objectId: number) => {
    setFavoriteIds((previousFavorites) =>
      previousFavorites.filter((favorite) => favorite !== objectId)
    );
  };

  const dismissError = () => {
    setError(null);
  };

  return [favorites, addFavorite, removeFavorite, error, dismissError];
};

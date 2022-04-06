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
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  //State specific to Favorite's page—-provides updates to page regarding fetch errors
  const [error, setError] = useState<any>();

  let notFirstRender = useRef(false);

  useEffect(() => {
    //Retrieve any pre-favorited object IDs from local storage to store in state
    setFavoriteIds(grabFavoritesFromStorage());
  }, []);

  useEffect(() => {
    //Retrieve actual objects based on fetched favorites IDs
    const fetchFavorites = async () => {
      try {
        const objects = await getArtObjects(favoriteIds);
        setFavorites(objects);
        setIsLoadingFavorites(false);
      } catch (error) {
        setError("Couldn't fetch favorite objects.");
        setIsLoadingFavorites(false);
      }
    };
    if (favoriteIds.length > 0) {
      fetchFavorites();
    } else if (notFirstRender.current) {
      //Flag for ensuring we don't clear out favorites on the initial render
      setFavorites([]);
      setIsLoadingFavorites(false);
    }
  }, [favoriteIds]);

  //Preventing initial render of state from removing pre-existing local storage values
  useEffect(() => {
    if (notFirstRender.current) {
      //Handling addition of new favorites in local storage
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

  //For outside pages to handle Favorites' error state
  const dismissError = () => {
    setError(null);
  };

  return [
    favorites,
    addFavorite,
    removeFavorite,
    isLoadingFavorites,
    error,
    dismissError,
  ];
};

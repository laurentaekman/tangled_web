import React, { useEffect, useRef, useState } from "react";
import { APIArtObject, ArtObject, convertArtObject } from "../utils/types";
import {
  grabFavoritesFromStorage,
  setFavoritesInStorage,
} from "../utils/storage";
import { getArtObjects } from "../utils/api";

export const useFavorites = (): any[] => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<ArtObject[]>([]);
  let notFirstRender = useRef(false);

  useEffect(() => {
    setFavoriteIds(grabFavoritesFromStorage());
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const apiObjects: APIArtObject[] = await getArtObjects(favoriteIds);
      const objects = apiObjects.map((apiObject) =>
        convertArtObject(apiObject)
      );
      setFavorites(objects);
    };
    if (favoriteIds.length > 0) {
      fetchFavorites();
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

  return [favorites, addFavorite, removeFavorite];
};

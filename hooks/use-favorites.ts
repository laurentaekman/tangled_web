import React, { useEffect, useState } from "react";
import {
  APIArtObject,
  ArtObject,
  convertArtObject,
} from "../pages/art-posts/[objectId]";
import {
  grabFavoritesFromStorage,
  setFavoritesInStorage,
} from "../utils/storage";
import { getArtObjects } from "../utils/utils";

export const useFavorites = (): any[] => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<ArtObject[]>([]);

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
    setFavoritesInStorage(favoriteIds);
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

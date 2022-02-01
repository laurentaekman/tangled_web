const favoritesKey = "favorites";
export const grabFavoritesFromStorage = (): number[] => {
  const favoritesJSON = window.localStorage.getItem(favoritesKey);
  if (!favoritesJSON) {
    return [];
  }
  const favorites = JSON.parse(favoritesJSON);
  return favorites;
};

export const setFavoritesInStorage = (favoriteIds: number[]) => {
  window.localStorage.clear();
  window.localStorage.setItem(favoritesKey, JSON.stringify(favoriteIds));
};

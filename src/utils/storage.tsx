function loadFavorites(): Promise<number[]> {
  const rawValue = localStorage.getItem('favorites');
  const data = JSON.parse(rawValue || '[]');
  // returns a Promise for React Query
  return new Promise((resolve) => resolve(data));
}

function saveFavorites(favorites: number[]) {
  const json = JSON.stringify(favorites);
  localStorage.setItem('favorites', json);
}

async function addToFavorites(id: number) {
  const favorites = await loadFavorites();
  return new Promise((resolve, reject) => {
    if (favorites.includes(id)) {
      reject(`Object ID ${id} is already a favorite.`);
    }
    const favoritesUpdated = [...favorites, id];
    saveFavorites(favoritesUpdated);
    resolve(favoritesUpdated);
  });
}

async function removeFromFavorites(id: number) {
  const favorites = await loadFavorites();
  return new Promise((resolve, reject) => {
    if (!favorites.includes(id)) {
      reject(`Object ID ${id} is not a favorite.`);
    }
    favorites.splice(favorites.indexOf(id), 1);
    saveFavorites(favorites);
    resolve(favorites);
  });
}

export { loadFavorites, addToFavorites, removeFromFavorites };

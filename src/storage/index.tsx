function loadFavorites(): number[] {
  const rawValue = localStorage.getItem('favorites');
  return JSON.parse(rawValue || '[]');
}

function saveFavorites(favorites: number[]) {
  const json = JSON.stringify(favorites);
  localStorage.setItem('favorites', json);
}

function addToFavorites(id: number) {
  const favorites = loadFavorites();
  if (favorites.includes(id)) {
    console.log(`Object ID ${id} is already a favorite.`);
    return;
  }
  saveFavorites([...favorites, id]);
}

function removeFromFavorites(id: number) {
  const favorites = loadFavorites();
  if (!favorites.includes(id)) {
    console.log(`Object ID ${id} is not a favorite.`);
    return;
  }
  favorites.splice(favorites.indexOf(id), 1);
  saveFavorites(favorites);
}

export { loadFavorites, addToFavorites, removeFromFavorites };

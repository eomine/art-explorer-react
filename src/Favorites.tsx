import Item from './components/Item';
import { loadFavorites } from './utils/storage';

export default function Favorites() {
  const favorites = loadFavorites();

  if (favorites.length === 0) {
    return <h2>There are no favorites yet</h2>;
  }

  return (
    <>
      {favorites.map((objectID) => (
        <Item key={objectID} objectID={objectID} />
      ))}
    </>
  );
}

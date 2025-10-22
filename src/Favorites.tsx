import Item from './components/Item';
import { loadFavorites } from './utils/storage';

export default function Favorites() {
  const favorites = loadFavorites();

  if (favorites.length === 0) {
    return <h2>There are no favorites yet</h2>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {favorites.map((objectID) => (
          <Item key={objectID} objectID={objectID} />
        ))}
      </div>
    </div>
  );
}

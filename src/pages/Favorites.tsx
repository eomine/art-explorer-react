import { useQuery } from '@tanstack/react-query';
import Item from '../components/Item';
import { loadFavorites } from '../utils/storage';

export default function Favorites() {
  const {
    data: favorites,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => loadFavorites(),
  });

  if (isLoading) {
    return <h2>Loading favorites...</h2>;
  }

  if (isError) {
    return (
      <>
        <h3>Failed to load data</h3>
        {typeof error === 'string' && <h4>{error}</h4>}
      </>
    );
  }

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

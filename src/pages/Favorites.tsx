import { useQuery } from '@tanstack/react-query';
import ErrorMessage from '../components/ErrorMessage';
import Item from '../components/Item';
import Loading from '../components/Loading';
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
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (favorites.length === 0) {
    return <h2 className="font-bold">There are no favorites yet</h2>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
      {favorites.map((objectID) => (
        <Item key={objectID} objectID={objectID} />
      ))}
    </div>
  );
}

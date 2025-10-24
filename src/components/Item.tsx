import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getArtObject } from '../utils/api';
import {
  addToFavorites,
  loadFavorites,
  removeFromFavorites,
} from '../utils/storage';
import Loading from './Loading';

type Props = {
  objectID: number;
};

export default function Item(props: Props) {
  const { objectID } = props;

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['item', objectID],
    queryFn: () => getArtObject(objectID),
  });

  const { data: favorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => loadFavorites(),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (operation: 'add' | 'remove') => {
      return operation === 'add'
        ? addToFavorites(objectID)
        : removeFromFavorites(objectID);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const isFavorite = favorites?.includes(objectID);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <>
        <h3>Failed to load data</h3>
        {typeof error === 'string' && <h4>{error}</h4>}
      </>
    );
  }

  const {
    primaryImageSmall,
    title,
    artistDisplayName,
    objectDate,
    medium,
    department,
    objectURL,
  } = data;

  const onClickFavorite = () => {
    const isFavoriteUpdated = !isFavorite;
    mutate(isFavoriteUpdated ? 'add' : 'remove');
  };

  return (
    <div className="p-4">
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-500 min-h-64 mb-2 flex items-center justify-center">
        {primaryImageSmall ? (
          <img className="mb-2" src={primaryImageSmall} alt={title} />
        ) : (
          'No image available'
        )}
      </div>
      <div className="font-bold text-lg leading-[1.2] mb-1">
        <a href={objectURL} className="underline">
          {title}
        </a>
      </div>
      <div className="font-bold mb-1">{artistDisplayName}</div>
      <div className="text-sm mb-1">{objectDate}</div>
      <div className="text-gray-800 dark:text-gray-400 text-sm">{medium}</div>
      <div className="text-gray-800 dark:text-gray-400 text-sm mb-2">
        {department}
      </div>
      <button
        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-950 cursor-pointer px-4 py-2 text-xs"
        onClick={onClickFavorite}
      >
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </div>
  );
}

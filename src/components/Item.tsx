import { useEffect, useState } from 'react';
import { getArtObject, type ArtObject } from '../utils/api';
import type { State } from '../types/state';
import {
  addToFavorites,
  loadFavorites,
  removeFromFavorites,
} from '../utils/storage';

type Props = {
  objectID: number;
};

export default function Item(props: Props) {
  const { objectID } = props;
  const [state, setState] = useState<State<ArtObject>>({
    status: 'loading',
  });

  useEffect(() => {
    getArtObject(objectID)
      .then((data) => {
        setState({
          status: 'success',
          data,
        });
      })
      .catch((error) => {
        setState({
          status: 'error',
          error,
        });
      });
  }, [objectID]);

  // TODO this should be cached to avoid calling localStorage repeatedly
  const favorites = loadFavorites();
  const [isFavorite, setFavorite] = useState(favorites.includes(objectID));

  if (state.status === 'loading') {
    return <h3>Loading object...</h3>;
  }

  if (state.status === 'error') {
    return <h3>Failed to load data: {state.error}</h3>;
  }

  const {
    primaryImageSmall,
    title,
    artistDisplayName,
    objectDate,
    medium,
    department,
    objectURL,
  } = state.data;

  const onClickFavorite = () => {
    const isFavoriteUpdated = !isFavorite;
    setFavorite(isFavoriteUpdated);
    if (isFavoriteUpdated) {
      addToFavorites(objectID);
    } else {
      removeFromFavorites(objectID);
    }
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

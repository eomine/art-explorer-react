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
    <div>
      {primaryImageSmall ? (
        <img src={primaryImageSmall} alt={title} />
      ) : (
        'No image available'
      )}
      <div>
        <a href={objectURL}>{title}</a>
      </div>
      <div>{artistDisplayName}</div>
      <div>{objectDate}</div>
      <div>{medium}</div>
      <div>{department}</div>
      <button onClick={onClickFavorite}>
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </div>
  );
}

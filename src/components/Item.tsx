import { useEffect, useState } from 'react';
import { getArtObject, type ArtObject } from '../api';
import type { State } from '../types/state';

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
    </div>
  );
}

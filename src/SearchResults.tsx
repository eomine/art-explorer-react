import { useEffect, useState } from 'react';
import { getSearchResults } from './utils/api';
import Item from './components/Item';
import type { State } from './types/state';

function SearchResults() {
  const [state, setState] = useState<State<number[]>>({
    status: 'loading',
  });

  useEffect(() => {
    getSearchResults()
      .then((list) => {
        setState({
          status: 'success',
          data: list,
        });
      })
      .catch((error) => {
        setState({
          status: 'error',
          error,
        });
      });
  }, []);

  if (state.status === 'loading') {
    return <h2>Loading search results...</h2>;
  }

  if (state.status === 'error') {
    return <h2>Failed to load data: {state.error}</h2>;
  }

  if (state.data.length === 0) {
    return <h2>No results</h2>;
  }

  return (
    <>
      {state.data.map((objectID) => (
        <Item key={objectID} objectID={objectID} />
      ))}
    </>
  );
}

export default SearchResults;

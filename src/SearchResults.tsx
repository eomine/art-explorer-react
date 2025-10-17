import { useEffect, useState } from 'react';
import { getSearchResults } from './utils/api';
import Item from './components/Item';
import type { State } from './types/state';

function SearchResults() {
  const [state, setState] = useState<State<number[]>>({
    status: 'loading',
  });
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);

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

  const onClickLoadMore = () => {
    setPage(page + 1);
    setLoadingMore(true);
    getSearchResults(page + 1)
      .then((list) => {
        setState({
          status: 'success',
          data: [...state.data, ...list],
        });
      })
      .catch((error) => {
        setState({
          status: 'error',
          error,
        });
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  return (
    <>
      {state.data.map((objectID) => (
        <Item key={objectID} objectID={objectID} />
      ))}
      {isLoadingMore ? (
        <div>Loading...</div>
      ) : (
        <button onClick={onClickLoadMore}>Load more</button>
      )}
    </>
  );
}

export default SearchResults;

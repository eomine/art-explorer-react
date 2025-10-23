import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { State } from '../types/state';
import { getSearchResults } from '../utils/api';
import Item from './Item';

function SearchResults() {
  const params = useParams();
  const query = params.query ?? 'painting';
  const { departmentId } = params;

  const [state, setState] = useState<State<number[]>>({
    status: 'loading',
  });
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setState({ status: 'loading' });
    getSearchResults(query, 0, departmentId)
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
  }, [query, departmentId]);

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
    getSearchResults(query, page + 1, departmentId)
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
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {state.data.map((objectID) => (
          <Item key={objectID} objectID={objectID} />
        ))}
      </div>
      <button
        className="cursor-pointer bg-gray-300 dark:bg-gray-700 px-4 py-2 w-full"
        onClick={onClickLoadMore}
        disabled={isLoadingMore}
      >
        {isLoadingMore ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
}

export default SearchResults;

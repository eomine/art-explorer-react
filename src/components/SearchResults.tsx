import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSearchResults } from '../utils/api';
import ErrorMessage from './ErrorMessage';
import Item from './Item';
import Loading from './Loading';

function SearchResults() {
  const params = useParams();
  const query = params.query ?? 'painting';
  const { departmentId } = params;

  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 15;
  const onClickLoadMore = () => setPage(page + 1);
  useEffect(() => setPage(0), [query, departmentId]);

  const {
    data: objectIDs,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['search', query, departmentId],
    queryFn: () => getSearchResults(query, departmentId),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (objectIDs.length === 0) {
    return <h2 className="font-bold">No results</h2>;
  }

  const visibleObjectIDs = objectIDs.slice(0, (page + 1) * ITEMS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {visibleObjectIDs.map((objectID) => (
          <Item key={objectID} objectID={objectID} />
        ))}
      </div>
      <button
        className="cursor-pointer bg-gray-300 dark:bg-gray-700 my-8 px-4 py-2 w-full"
        onClick={onClickLoadMore}
      >
        Load more
      </button>
    </>
  );
}

export default SearchResults;

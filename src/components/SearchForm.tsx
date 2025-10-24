import { type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router';
import SearchFilters from './SearchFilters';

export default function SearchForm() {
  const navigate = useNavigate();
  const onSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    const departmentId = formData.get('departmentId');
    if (Number(departmentId) > 0) {
      navigate(`/search/${query}/department/${departmentId}`);
    } else {
      navigate(`/search/${query}`);
    }
  };

  const params = useParams();
  const query = params.query ?? 'painting';

  return (
    <form
      className="py-2 mb-8 flex flex-col md:flex-row gap-2 md:items-center"
      onSubmit={onSubmitSearch}
    >
      <label htmlFor="query" className="text-xs">
        Search for:
      </label>
      <input
        type="text"
        name="query"
        defaultValue={query}
        className="border-1 border-gray-300 dark:border-gray-700 px-2 py-1 text-sm"
      ></input>
      <SearchFilters />
      <button className="cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-1">
        Search
      </button>
    </form>
  );
}

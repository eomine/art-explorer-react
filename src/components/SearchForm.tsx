import { type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function SearchForm() {
  const navigate = useNavigate();
  const onSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query')?.toString();
    navigate(`/search/${query}`);
  };

  const params = useParams();
  const query = params.query ?? 'painting';

  return (
    <form
      className="bg-gray-100 dark:bg-gray-900 px-8 py-4 flex gap-2"
      onSubmit={onSubmitSearch}
    >
      <input
        type="text"
        name="query"
        placeholder="Search for art objects..."
        defaultValue={query}
        className="border-1 border-gray-300 dark:border-gray-700 px-2 py-1"
      ></input>
      <button className="cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 px-4">
        Search
      </button>
    </form>
  );
}

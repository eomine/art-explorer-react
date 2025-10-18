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
    <form onSubmit={onSubmitSearch}>
      <input
        type="text"
        name="query"
        placeholder="Search for art objects..."
        defaultValue={query}
      ></input>
      <button>Search</button>
    </form>
  );
}

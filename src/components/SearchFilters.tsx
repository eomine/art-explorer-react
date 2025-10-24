import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getDepartments } from '../utils/api';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

export default function SearchFilters() {
  const params = useParams();
  const { departmentId } = params;

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <label htmlFor="departmentId" className="text-xs">
        Filter by department:
      </label>
      <select
        name="departmentId"
        className="border-1 border-gray-300 dark:border-gray-700 px-2 py-1 text-sm"
        defaultValue={departmentId}
      >
        <option value={0}> All departments</option>
        {data.map((dept) => (
          <option key={dept.departmentId} value={dept.departmentId}>
            {dept.displayName}
          </option>
        ))}
      </select>
    </>
  );
}

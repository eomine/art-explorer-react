import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getDepartments } from '../utils/api';

export default function SearchFilters() {
  const params = useParams();
  const { departmentId } = params;

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
  });

  if (isLoading) {
    return <h3>Loading departments...</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>Failed to load data</h3>
        {typeof error === 'string' && <h4>{error}</h4>}
      </>
    );
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

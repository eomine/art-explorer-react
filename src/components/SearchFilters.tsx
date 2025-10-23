import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { State } from '../types/state';
import { getDepartments, type Department } from '../utils/api';

export default function SearchFilters() {
  const params = useParams();
  const { departmentId } = params;

  const [state, setState] = useState<State<Department[]>>({
    status: 'loading',
  });

  useEffect(() => {
    getDepartments()
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
  }, []);

  if (state.status === 'loading') {
    return <h3>Loading departments...</h3>;
  }

  if (state.status === 'error') {
    return <h3>Failed to load data: {state.error}</h3>;
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
        {state.data.map((dept) => (
          <option key={dept.departmentId} value={dept.departmentId}>
            {dept.displayName}
          </option>
        ))}
      </select>
    </>
  );
}

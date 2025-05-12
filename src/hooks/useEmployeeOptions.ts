import { useState, useEffect } from 'react';
import { fetchEmployeeOptions } from '@/services/employee.service';
import type { EmployeeOption } from '@/models/employee.model';

export const useEmployeeOptions = () => {
  const [options, setOptions] = useState<EmployeeOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      const data = await fetchEmployeeOptions();
      setOptions(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return {
    options,
    loading,
    error,
    refetch: fetchOptions,
  };
};

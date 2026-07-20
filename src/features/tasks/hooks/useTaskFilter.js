import { useSearchParams } from 'react-router-dom';
import { filterConfig } from '../config/filterConfig';

export function useTaskFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {};
  filterConfig.forEach(({ field }) => {
    filters[field] = searchParams.getAll(field);
  });

  const toggleFilter = (field, value) => {
    const current = searchParams.getAll(field);
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];

    const next = new URLSearchParams(searchParams);
    next.delete(field);
    updated.forEach(v => next.append(field, v));
    setSearchParams(next);
  };

  return { filters, toggleFilter };
}
import { useSearchParams } from 'react-router-dom';

export function useTaskSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get('sort') || 'desc';

  const toggleSort = () => {
    const next = new URLSearchParams(searchParams);
    next.set('sort', sortOrder === 'asc' ? 'desc' : 'asc');
    next.set('page', '1');
    setSearchParams(next);
  };

  return { sortOrder, toggleSort };
}
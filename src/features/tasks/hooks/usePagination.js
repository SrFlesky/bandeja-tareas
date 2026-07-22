import { useSearchParams } from 'react-router-dom';

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const goToPage = (newPage) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', newPage);
    setSearchParams(next);
  };

  return { page, goToPage };
}
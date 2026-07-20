import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useTaskSearch(delay = 300) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (inputValue) {
        next.set('search', inputValue);
      } else {
        next.delete('search');
      }
      setSearchParams(next, { replace: true });
    }, delay);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return { inputValue, setInputValue };
}
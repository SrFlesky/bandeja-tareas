import { useState, useEffect } from 'react';

export function useAlertCarousel(items, intervalMs = 4000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  return items[index];
}
export function formatRelativeDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();

  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Hoy';
  if (diffDays === 1) return 'Hace 1 día';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 8) return 'Hace 1 semana';

  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
  }).replace('.', '');
}
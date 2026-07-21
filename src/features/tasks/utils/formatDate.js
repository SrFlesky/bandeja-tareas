function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default formatDate;
export function sortTasks(tasks, order = 'desc') {
  return [...tasks].sort((a, b) =>
    order === 'asc'
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt)
  );
}
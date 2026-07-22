export function paginateTasks(tasks, page = 1, pageSize = 20) {
  const start = (page - 1) * pageSize;
  const paginated = tasks.slice(start, start + pageSize);
  const totalPages = Math.ceil(tasks.length / pageSize);

  return { paginated, totalPages, totalItems: tasks.length };
}
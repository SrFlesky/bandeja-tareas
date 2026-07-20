export function searchTasks(tasks, searchTerm) {
  if (!searchTerm) return tasks;

  const term = searchTerm.toLowerCase();
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(term) ||
      task.assignedTo.toLowerCase().includes(term)
  );
}

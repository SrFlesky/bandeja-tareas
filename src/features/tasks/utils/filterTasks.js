export function filterTasks(tasks, filters) {
  return tasks.filter((task) =>
    Object.entries(filters).every(([field, values]) => {
      if (!values || values.length === 0) return true;
      return values.includes(task[field]);
    })
  );
}

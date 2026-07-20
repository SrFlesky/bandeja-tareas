import { useTasks } from "../tasks/hooks/useTasks";

function TasksPage() {
  const { tasks, loading, error } = useTasks();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="text-black">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>{task.title}</p>
            <p>
              {task.assignedTo} | {task.process} | {task.priority} | {task.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
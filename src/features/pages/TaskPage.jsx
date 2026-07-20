import { useTasks } from "../tasks/hooks/useTasks";

function TasksPage() {
  const { tasks, loading, error } = useTasks();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="text-black">
      <p1>Funciona</p1>
    </div>
  );
}

export default TasksPage;
import { useTasks } from "../tasks/hooks/useTasks";
import { useTaskSearch } from '../tasks/hooks/useTaskSearch'
import SearchBar from '../tasks/components/SearchBar/SearchBar';
import { searchTasks } from "../tasks/utils/searchTasks";

function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const { inputValue, setInputValue } = useTaskSearch();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const searchedTasks = searchTasks(tasks, inputValue);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Bandeja de tareas</h1>

      <SearchBar value={inputValue} onChange={setInputValue} />

      <ul className="flex flex-col gap-2 mt-4">
        {searchedTasks.map((task) => (
          <li key={task.id} className="border rounded p-3">
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-gray-600">
              {task.assignedTo} | {task.process} | {task.priority} |
              {task.status} | {task.createdAt}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;

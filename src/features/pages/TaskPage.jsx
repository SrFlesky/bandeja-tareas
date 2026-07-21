import { useTasks } from "../tasks/hooks/useTasks";
import { useTaskSearch } from "../tasks/hooks/useTaskSearch";
import { useTaskFilter } from '../tasks/hooks/useTaskFilter';
import { useTaskSort } from "../tasks/hooks/useTaskSort";
import { useSelectedTask } from '../tasks/hooks/useSelectedTask';
import SearchBar from "../tasks/components/SearchBar/SearchBar";
import FilterBar from '../tasks/components/FilterBar/FilterBar';
import SortButton from "../tasks/components/SortButton/SortButton";
import TaskDetail from '../tasks/components/TaskDetail/TaskDetail';
import { searchTasks } from "../tasks/utils/searchTasks";
import { filterTasks } from '../tasks/utils/filterTasks';
import { sortTasks } from "../tasks/utils/sortTasks";
import formatDate from "../tasks/utils/formatDate";

function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const { inputValue, setInputValue } = useTaskSearch();
  const { filters, toggleFilter } = useTaskFilter();
  const { sortOrder, toggleSort } = useTaskSort();
  const { selectedTask, openTask, closeTask } = useSelectedTask();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const searchedTasks = searchTasks(tasks, inputValue);
  const filteredTasks = filterTasks(searchedTasks, filters);
  const sortedTasks = sortTasks(filteredTasks, sortOrder); 

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Bandeja de tareas</h1>

      <SearchBar value={inputValue} onChange={setInputValue} />
      <FilterBar filters={filters} toggleFilter={toggleFilter} />
      <SortButton sortOrder={sortOrder} toggleSort={toggleSort} />

      <ul className="flex flex-col gap-2 mt-4">
        {sortedTasks.map((task) => (
          <li key={task.id} onClick={() => openTask(task.id)} className="border rounded p-3">
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-gray-600">
              {task.assignedTo} | {task.process} | {task.priority} |
              {task.status} | {formatDate(task.createdAt)}
            </p>
          </li>
        ))}
      </ul>

      <TaskDetail task={selectedTask} onClose={closeTask} />

    </div>
  );
}

export default TasksPage;

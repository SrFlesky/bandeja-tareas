import { useTasks } from "../tasks/hooks/useTasks";
import { useTaskSearch } from "../tasks/hooks/useTaskSearch";
import { useTaskFilter } from "../tasks/hooks/useTaskFilter";
import { useTaskSort } from "../tasks/hooks/useTaskSort";
import { useSelectedTask } from "../tasks/hooks/useSelectedTask";
import SearchBar from "../tasks/components/SearchBar/SearchBar";
import FilterBar from "../tasks/components/FilterBar/FilterBar";
import SortButton from "../tasks/components/SortButton/SortButton";
import TaskDetail from "../tasks/components/TaskDetail/TaskDetail";
import TaskCard from "../tasks/components/TaskCard/TaskCard";
import { searchTasks } from "../tasks/utils/searchTasks";
import { filterTasks } from "../tasks/utils/filterTasks";
import { sortTasks } from "../tasks/utils/sortTasks";
import formatDate from "../tasks/utils/formatDate";
import { cn } from "../../shared/utils/cn";

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
    <div className="px-4 py-4 md:px-8 md:py-6 md:mx-auto">
      <div
        className={cn(
          "transition-all duration-300",
          selectedTask && "md:mr-96"
        )}
      >
        <div className="flex items-center whitespace-nowrap w-full gap-2">
          <SearchBar value={inputValue} onChange={setInputValue} />
          <FilterBar filters={filters} toggleFilter={toggleFilter} />
          <SortButton sortOrder={sortOrder} toggleSort={toggleSort} />
        </div>
      </div>

      <ul className="">
        <div
          className={cn(
            "flex flex-col mt-4 gap-2 transition-all duration-300",
            selectedTask && "md:mr-96"
          )}
        >
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => openTask(task.id)}
            />
          ))}
        </div>
      </ul>

      <TaskDetail task={selectedTask} onClose={closeTask} />
    </div>
  );
}

export default TasksPage;

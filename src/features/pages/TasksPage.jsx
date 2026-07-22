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
import TaskEditModal from "../tasks/components/TaskEditModal/TaskEditModal";
import { useTaskEditor } from "../tasks/hooks/useTaskEditor";

function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const { inputValue, setInputValue } = useTaskSearch();
  const { filters, toggleFilter } = useTaskFilter();
  const { sortOrder, toggleSort } = useTaskSort();
  const { selectedTask, openTask, closeTask } = useSelectedTask();
  const { editingTask, openEditor, closeEditor } = useTaskEditor();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const searchedTasks = searchTasks(tasks, inputValue);
  const filteredTasks = filterTasks(searchedTasks, filters);
  const sortedTasks = sortTasks(filteredTasks, sortOrder);

  return (
    <div className="px-4 py-4 md:px-6 md:py-4 md:mx-auto">
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
              onEdit={openEditor}
            />
          ))}
        </div>
      </ul>

      <TaskDetail task={selectedTask} onClose={closeTask} onEdit={openEditor} />
      <TaskEditModal task={editingTask} onClose={closeEditor} />
    </div>
  );
}

export default TasksPage;

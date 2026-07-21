import { useSearchParams } from 'react-router-dom';
import { useTaskStore } from '../store/useTaskStore';

export function useSelectedTask() {
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = searchParams.get('taskId');
  const tasks = useTaskStore(state => state.tasks);

  const selectedTask = taskId
    ? tasks.find(task => String(task.id) === taskId)
    : null;

  const openTask = (id) => {
    const next = new URLSearchParams(searchParams);
    next.set('taskId', id);
    setSearchParams(next);
  };

  const closeTask = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('taskId');
    setSearchParams(next);
  };

  return { selectedTask, openTask, closeTask };
}
import { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export function useTasks() {
  const { tasks, loading, error, loadTasks } = useTaskStore();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return { tasks, loading, error };
}
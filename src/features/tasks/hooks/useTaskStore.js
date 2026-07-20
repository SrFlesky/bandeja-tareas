import { create } from "zustand";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  loadTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await fetchTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  editTask: async (id, changes) => {
    const updated = await updateTask(id, changes);
    set({
      tasks: get().tasks.map((task) => (task.id === id ? updated : task)),
    });
  },
}));

import mockTasks from "../../../data/mockTasks.json";

let tasks = [...mockTasks];

export async function fetchTasks() {
  return [...tasks];
}

export async function fetchTasksById() {
  const task = tasks.find((task) => task.id === id);
  if (!task) throw new Error(`Error: Tarea ${id} no encontrada`);
}

export async function updateTask(id, changes) {
  tasks = tasks.map((task) => (task.id === id ? { ...task, ...changes } : t));
}

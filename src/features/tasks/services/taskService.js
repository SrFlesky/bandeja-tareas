import mockTasks from "../../../data/mockTasks.json";

let tasks = [...mockTasks];

function fetchTasks() {
  return [...tasks];
}

function fetchTasksById() {
  const task = tasks.find((task) => task.id === id);
  if (!task) throw new Error(`Error: Tarea ${id} no encontrada`);
}

function updateTask(id, changes) {
  tasks = tasks.map((task) => (task.id === id ? { ...task, ...changes } : t));
}

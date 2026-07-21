export const TASK_STATUS = {
  PENDING: 'Pendiente',
  PROGRESS: 'En Progreso',
  FINISHED: 'Completada',
};

export const TASK_STATUS_LIST = Object.values(TASK_STATUS);

export const STATUS_KEY_BY_LABEL = Object.fromEntries(
  Object.entries(TASK_STATUS).map(([key, label]) => [label, key])
);
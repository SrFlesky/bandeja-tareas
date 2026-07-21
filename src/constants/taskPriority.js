export const TASK_PRIORITY = {
  HIGH: 'Alta',
  MID: 'Media',
  LOW: 'Baja',
};

export const TASK_PRIORITY_LIST = Object.values(TASK_PRIORITY);

export const PRIORITY_KEY_BY_LABEL = Object.fromEntries(
  Object.entries(TASK_PRIORITY).map(([key, label]) => [label, key])
);
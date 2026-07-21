export const TASK_PROCESS = {
  ACCOUNTING: "Contabilidad",
  COLLECTIONS: "Cartera",
  MARKETING: "Marketing",
  TI: "TI",
  LOGISTICS: "Logística",
  TREASURY: "Tesorería",
  AUDIT: "Auditoría",
  INFRASTRUCTURE: "Infraestructura",
  LEGAL: "Legal",
  OTHER: "Others",
};

export const TASK_PROCESS_LIST = Object.values(TASK_PROCESS);

export const PROCESS_KEY_BY_LABEL = Object.fromEntries(
  Object.entries(TASK_PROCESS).map(([key, label]) => [label, key])
);

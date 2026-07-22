export const TASK_PROCESS = {
  ACCOUNTING: 'Contabilidad',
  COLLECTIONS: 'Cartera',
  MARKETING: 'Marketing',
  IT: 'TI',
  LOGISTICS: 'Logística',
  TREASURY: 'Tesorería',
  AUDIT: 'Auditoría',
  INFRAESTRUCTURE: 'Infraestructura',
  LEGAL: 'Legal',
  PROCUREMENT: 'Compras',
  CUSTOMER_SERVICE: 'Servicio al Cliente',
};

export const TASK_PROCESS_LIST = Object.values(TASK_PROCESS);

export const PROCESS_KEY_BY_LABEL = Object.fromEntries(
  Object.entries(TASK_PROCESS).map(([key, label]) => [label, key])
);
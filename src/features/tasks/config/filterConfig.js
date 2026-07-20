import { TASK_STATUS_LIST } from "../../../constants/taskStatus";
import { TASK_PRIORITY_LIST } from "../../../constants/taskPriority";
import { TASK_PROCESS_LIST } from "../../../constants/taskProcess";

export const filterConfig = [
  { field: "status", label: "Estado", options: TASK_STATUS_LIST },
  { field: "priority", label: "Prioridad", options: TASK_PRIORITY_LIST },
  { field: "process", label: "Proceso", options: TASK_PROCESS_LIST },
  { field: "assignedTo", label: "Responsable", options: EMPLOYEES_LIST },
];

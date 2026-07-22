import { cn } from "../../../../shared/utils/cn";
import {
  priorityColors,
  defaultPriorityColor,
} from "../../config/priorityColors";
import { statusColors, defaultStatusColor } from "../../config/statusColors";
import { processColors, defaultProcessColor } from "../../config/processColors";
import { PRIORITY_KEY_BY_LABEL } from "../../../../constants/taskPriority";
import { STATUS_KEY_BY_LABEL } from "../../../../constants/taskStatus";
import { PROCESS_KEY_BY_LABEL } from "../../../../constants/taskProcess";
import { formatRelativeDate } from "../../utils/formatRelativeDate";
import ActivityTimeline from "../ActivityTimeline/ActivityTimeline";
import { X } from "lucide-react";

function TaskDetailContent({ task, onClose, onEdit }) {
  const priorityKey = PRIORITY_KEY_BY_LABEL[task.priority];
  const priorityColor = priorityColors[priorityKey] || defaultPriorityColor;

  const statusKey = STATUS_KEY_BY_LABEL[task.status];
  const statusColor = statusColors[statusKey] || defaultStatusColor;

  const processKey = PROCESS_KEY_BY_LABEL[task.process];
  const processColor = processColors[processKey] || defaultProcessColor;

  const activityLog = task.activityLog?.length
    ? [...task.activityLog].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [{ id: "created", text: "Creación de la tarea", date: task.createdAt }];

  return (
    <>
      <div className="flex items-center justify-between px-5 py-4 border-b border-ink-muted/15">
        <h2 className="text-lg font-medium text-ink-primary">
          Información relevante
        </h2>
        <button
          onClick={onClose}
          className="min-h-8 min-w-8 flex items-center justify-center text-ink-muted hover:text-ink-primary hover:bg-page-bg rounded-md transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-6">
        <div>
          <p className="text-xs text-ink-muted uppercase tracking-wide mb-1">
            Detalles
          </p>
          <h1 className="text-xl font-bold text-ink-primary leading-snug mb-2">
            {task.title}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-pill border",
                processColor.text,
                processColor.bar
              )}
            >
              {task.process}
            </span>
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-pill",
                priorityColor.badge,
                priorityColor.text
              )}
            >
              {task.priority}
            </span>
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-wide",
                statusColor.text
              )}
            >
              {task.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-page-bg rounded-card p-3">
            <p className="text-xs text-ink-muted mb-1">Responsable</p>
            <p className="text-sm font-semibold text-ink-primary">
              {task.assignedTo}
            </p>
          </div>
          <div className="bg-page-bg rounded-card p-3">
            <p className="text-xs text-ink-muted mb-1">Fecha límite</p>
            <p className="text-sm font-semibold text-ink-primary">
              {task.dueDate ? formatRelativeDate(task.dueDate) : "Sin definir"}
            </p>
          </div>
        </div>

        {task.notes && (
          <div>
            <p className="text-xs text-ink-muted uppercase tracking-wide mb-1.5">
              Notas
            </p>
            <p className="text-sm text-ink-secondary bg-page-bg rounded-card p-3 leading-relaxed">
              {task.notes}
            </p>
          </div>
        )}

        <div>
          <p className="text-xs text-ink-muted uppercase tracking-wide mb-3">
            Resumen de actividad
          </p>
          <ActivityTimeline activityLog={activityLog} />
        </div>

        <button
          onClick={() => onEdit(task.id)}
          className="w-full h-11 rounded-card bg-brand text-white font-medium hover:bg-brand-hover transition-colors"
        >
          Gestionar tarea
        </button>
      </div>
    </>
  );
}

export default TaskDetailContent;

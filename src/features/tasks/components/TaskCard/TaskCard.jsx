import { Check } from "lucide-react";
import { cn } from "../../../../shared/utils/cn";
import { formatRelativeDate } from "../../utils/formatRelativeDate";
import {
  priorityColors,
  defaultPriorityColor,
} from "../../config/priorityColors";
import { statusColors, defaultStatusColor } from "../../config/statusColors";
import { processColors, defaultProcessColor } from "../../config/processColors";
import { PROCESS_KEY_BY_LABEL } from "../../../../constants/taskProcess";
import { STATUS_KEY_BY_LABEL } from "../../../../constants/taskStatus";
import { PRIORITY_KEY_BY_LABEL } from "../../../../constants/taskPriority";

const statusProgress = {
  PENDING: 0,
  PROGRESS: 50,
  FINISHED: 100,
};

function TaskCard({ task, onClick, onEdit }) {
  const processKey = PROCESS_KEY_BY_LABEL[task.process];
  const processColor = processColors[processKey] || defaultProcessColor;

  const statusKey = STATUS_KEY_BY_LABEL[task.status];
  const statusColor = statusColors[statusKey] || defaultStatusColor;
  const progress = statusProgress[statusKey] ?? 0;
  const isCompleted = statusKey === "FINISHED";

  const priorityKey = PRIORITY_KEY_BY_LABEL[task.priority];
  const priorityColor = priorityColors[priorityKey] || defaultPriorityColor;

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-l-md border-ink-muted border-l-4 px-5 py-3 cursor-pointer",
        "hover:bg-page-bg transition-colors",
        processColor.bar
      )}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-medium text-ink-muted uppercase tracking-wide">
            {formatRelativeDate(task.createdAt)}
          </span>

          <h3
            className="inline-block w-fit text-base font-bold text-ink-primary leading-snug hover:text-brand cursor-pointer mt-1 mb-1"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task.id);
            }}
          >
            {task.title}
          </h3>

          <p className="text-sm text-ink-secondary">
            Responsable:{" "}
            <span className="text-ink-primary">{task.assignedTo}</span>
          </p>
        </div>

        {/* Meta: badges + progreso */}
        <div className="flex flex-col gap-2 md:w-48 shrink-0">
          <div className="flex items-center gap-1.5 md:justify-end">
            <span
              className={cn(
                "hidden md:inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-pill border",
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
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-page-bg rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  statusColor.line
                )}
                style={{ width: `${progress}%` }}
              />
            </div>

            {isCompleted ? (
              <div
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                  statusColor.dot
                )}
              >
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </div>
            ) : (
              <span
                className={cn(
                  "text-[10px] font-semibold w-8 text-right shrink-0",
                  statusColor.text
                )}
              >
                {progress}%
              </span>
            )}
          </div>

          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-wide text-right",
              statusColor.text
            )}
          >
            {task.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

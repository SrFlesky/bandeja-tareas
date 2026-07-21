import { cn } from "../../../../shared/utils/cn";
import formatDate from "../../utils/formatDate";
import {
  priorityColors,
  defaultPriorityColor,
} from "../../config/priorityColors";
import {
  statusColors,
  defaultStatusColor,
  statusPosition,
} from "../../config/statusColors";
import { processColors, defaultProcessColor } from "../../config/processColors";
import { PROCESS_KEY_BY_LABEL } from "../../../../constants/taskProcess";
import { STATUS_KEY_BY_LABEL } from "../../../../constants/taskStatus";
import { PRIORITY_KEY_BY_LABEL } from "../../../../constants/taskPriority";
import { Check } from "lucide-react";

function TaskCard({ task, onClick }) {
  const processKey = PROCESS_KEY_BY_LABEL[task.process];
  const processColor = processColors[processKey] || defaultProcessColor;

  const statusKey = STATUS_KEY_BY_LABEL[task.status];
  const statusColor = statusColors[statusKey] || defaultStatusColor;
  const isCompleted = statusKey === "FINISHED";
  const isInProgress = statusKey === "PROGRESS";

  const priorityKey = PRIORITY_KEY_BY_LABEL[task.priority];
  const priorityColor = priorityColors[priorityKey] || defaultPriorityColor;

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-card border-l-4 p-4 cursor-pointer",
        "hover:bg-page-bg transition-colors",
        processColor.bar
      )}
    >
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-base font-bold text-ink-primary">{task.title}</h3>
        <span className="text-xs text-ink-muted whitespace-nowrap ml-3">
          {formatDate(task.createdAt)}
        </span>
      </div>

      <div className="flex items-center flex-wrap gap-3">
        <p className="text-sm text-ink-secondary whitespace-nowrap">
          {task.assignedTo}
        </p>

        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-pill",
            processColor.text
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

        <div className="flex flex-col items-center ml-auto">
          <span
            className={cn("text-[10px] font-medium mb-0.5", statusColor.text)}
          >
            {task.status}
          </span>

          <div className="flex items-center gap-1">
            <span
              className={cn(
                "text-[9px] w-6 text-right",
                isInProgress
                  ? "invisible"
                  : isCompleted
                  ? "text-transparent"
                  : "text-ink-muted"
              )}
            >
              0%
            </span>

            <div className="relative w-14 h-4">
              <div
                className={cn(
                  "absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2",
                  statusColor.line
                )}
              />
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center",
                  statusPosition[statusKey],
                  isCompleted
                    ? cn("w-2.5 h-2.5", statusColor.dot)
                    : cn("w-2.5 h-2.5 border-2 bg-white", statusColor.border)
                )}
              >
                {isCompleted && (
                  <Check className="w-1.7 h-1.7 text-white" strokeWidth={3} />
                )}
              </div>
            </div>
            {!isInProgress && (
              <span
                className={cn(
                  "text-[9px] w-8",
                  isInProgress
                    ? "invisible"
                    : isCompleted
                    ? "text-status-completada"
                    : "text-transparent"
                )}
              >
                100%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

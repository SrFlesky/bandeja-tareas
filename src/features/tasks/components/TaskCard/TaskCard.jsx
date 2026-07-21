import { cn } from "../../../../shared/utils/cn";
import formatDate from "../../utils/formatDate";
import { PROCESS_KEY_BY_LABEL } from "../../../../constants/taskProcess";
import { processColors, defaultProcessColor, priorityColors } from "../../config/processColors";

function TaskCard({ task, onClick }) {
  const processKey = PROCESS_KEY_BY_LABEL[task.process];
  const processColor = processColors[processKey] || defaultProcessColor;

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

      <p className="text-sm text-ink-secondary mb-3">{task.assignedTo}</p>

      <div className="flex gap-2">
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-pill",
            processColor.badge
          )}
        >
          {task.process}
        </span>
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-pill",
            priorityColors[task.priority]
          )}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;

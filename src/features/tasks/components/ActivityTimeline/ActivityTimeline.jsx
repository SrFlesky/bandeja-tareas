import { cn } from "../../../../shared/utils/cn";
import { formatRelativeDate } from "../../utils/formatRelativeDate";

function ActivityTimeline({ activityLog }) {
  return (
    <div className="max-h-64 overflow-y-auto pr-2 flex flex-col gap-4">
      {activityLog.map((item, index) => (
        <div key={item.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "w-2 h-2 rounded-full mt-1.5 shrink-0",
                index === 0 ? "bg-ink-primary" : "bg-ink-muted/40"
              )}
            />
            {index < activityLog.length - 1 && (
              <span className="w-px flex-1 bg-ink-muted/15 mt-1" />
            )}
          </div>
          <div className="pb-1">
            <p className="text-sm font-medium text-ink-primary">{item.text}</p>
            <p className="text-xs text-ink-muted">
              {formatRelativeDate(item.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivityTimeline;

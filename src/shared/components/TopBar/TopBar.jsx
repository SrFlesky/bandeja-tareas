import { RefreshCw, Bell, ShieldCheck, Headphones } from "lucide-react";
import { mockAlerts } from "./mockAlerts";
import { useSelectedTask } from "../../../features/tasks/hooks/useSelectedTask";
import { cn } from "../../utils/cn";

const iconMap = { RefreshCw, Bell, ShieldCheck };

function TopBar() {
  const { selectedTask } = useSelectedTask();

  return (
    <div
      className={cn(
        "bg-ink-primary text-white text-xs h-9 flex items-center justify-between px-4 shrink-0 transition-all duration-300",
        selectedTask && "md:mr-96"
      )}
    >
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
        {mockAlerts.map(({ icon, text }, index) => {
          const Icon = iconMap[icon];
          return (
            <div
              key={index}
              className="flex items-center gap-1.5 whitespace-nowrap"
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{text}</span>
            </div>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap pl-4">
        <Headphones className="w-3.5 h-3.5" />
        <span>Centro de ayuda</span>
      </div>
    </div>
  );
}

export default TopBar;

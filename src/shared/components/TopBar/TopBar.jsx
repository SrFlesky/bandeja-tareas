import { RefreshCw, Bell, ShieldCheck, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockAlerts } from "./mockAlerts";
import { useAlertCarousel } from "./useAlertCarousel";
import { useSelectedTask } from "../../../features/tasks/hooks/useSelectedTask";
import { cn } from "../../utils/cn";

const iconMap = { RefreshCw, Bell, ShieldCheck };

function TopBar() {
  const { selectedTask } = useSelectedTask();
  const currentAlert = useAlertCarousel(mockAlerts, 4000);
  const Icon = iconMap[currentAlert.icon];

  return (
    <div
      className={cn(
        "bg-ink-primary text-white text-xs h-9 flex items-center justify-between px-4 shrink-0 transition-all duration-300 overflow-hidden",
        selectedTask && "md:mr-96"
      )}
    >
      <div className="relative flex-1 h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAlert.text}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{currentAlert.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap pl-4">
        <Headphones className="w-3.5 h-3.5" />
        <span>Centro de ayuda</span>
      </div>
    </div>
  );
}

export default TopBar;

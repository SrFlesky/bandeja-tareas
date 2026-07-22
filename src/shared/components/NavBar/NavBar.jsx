import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Archive,
  Settings,
  Bell,
  User,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { id: "tasks", label: "Tareas", icon: CheckCircle },
  { id: "archive", label: "Archivo", icon: Archive },
  { id: "settings", label: "Configuración", icon: Settings },
];

function NavBar({ activePage = "tasks" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="hidden md:block relative h-screen shrink-0">
      <motion.nav
        animate={{ width: isCollapsed ? 0 : 100 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={cn(
          "hidden md:flex flex-col items-center h-screen bg-white overflow-hidden shrink-0 py-6",
          !isCollapsed && "border-r border-ink-muted/10"
        )}
      >
        <div className="flex flex-col items-center w-full min-w-[100px] h-full">
          {/* Logo */}
          <div className="mb-8">
            <span className="text-2xl font-bold text-brand">JM</span>
          </div>

          {/* Navegacion principal */}
          <div className="flex flex-col gap-2 w-17 h-17 px-2">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = id === activePage;
              return (
                <button
                  key={id}
                  className={cn(
                    "flex flex-col items-center gap-1 py-3 rounded-md transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-tag-red-bg text-brand hover:text-ink-secondary hover:bg-page-bg"
                      : "text-ink-secondary hover:bg-tag-red-bg hover:text-tag-red"
                  )}
                >
                  <Icon
                    className="w-5 h-5 shrink-0"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {/*<span className="text-[11px] font-medium">{label}</span>*/}
                </button>
              );
            })}
          </div>

          <div className="flex-1" />

          {/* Notificaciones */}
          <button
            className="relative w-10 h-10 flex items-center justify-center rounded-md text-ink-secondary hover:bg-page-bg hover:text-ink-secondary transition-colors mb-4 shrink-0"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-md bg-priority-alta" />
          </button>

          {/* Avatar */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md bg-fill-control text-ink-secondary hover:bg-page-bg transition-colors shrink-0"
            aria-label="Cuenta"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 right-0 z-10 w-5 h-8 bg-white",
          "border border-ink-muted/15 rounded-full",
          "flex items-center justify-center text-ink-muted hover:text-ink-primary hover:border-ink-muted/30 hover:bg-page-bg",
          "shadow-sm transition-all duration-300",
          isCollapsed ? "translate-x-full" : "translate-x-[10px]"
        )}
        aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.div>
      </button>
    </div>
  );
}

export default NavBar;

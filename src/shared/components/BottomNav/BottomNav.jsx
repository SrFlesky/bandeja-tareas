import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Archive, Settings, Menu, X, Bell } from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { id: "tasks", label: "Tareas", icon: CheckCircle },
  { id: "archive", label: "Archivo", icon: Archive },
  { id: "settings", label: "Configuración", icon: Settings },
  { id: "alerts", label: "Alertas", icon: Bell }
];

function BottomNav({ activePage = "tasks" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/40 z-30"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed bottom-16 left-0 right-0 z-40 bg-white rounded-t-2xl border-t border-ink-muted/10 p-3"
            >
              {navItems.map(({ id, label, icon: Icon }) => {
                const isActive = id === activePage;
                return (
                  <button
                    key={id}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-card transition-colors",
                      isActive
                        ? "bg-tag-red-bg text-brand"
                        : "text-ink-secondary hover:bg-page-bg"
                    )}
                  >
                    <Icon
                      className="w-5 h-5"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-ink-muted/10 flex items-center justify-around">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex flex-col items-center gap-1 text-ink-secondary min-h-11 min-w-11 justify-center"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="text-[10px] font-medium">Menú</span>
        </button>
      </nav>
    </div>
  );
}

export default BottomNav;

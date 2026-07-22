import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function TaskEditModal({ task, onClose }) {
  return (
    <AnimatePresence>
      {task && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 30, stiffness: 500 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-card w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-muted/20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-ink-muted bg-page-bg px-2 py-1 rounded-pill">
                  ÍTEM {task.id}
                </span>
                <h2 className="text-lg font-medium text-ink-primary">
                  Gestión de tarea
                </h2>
              </div>
              <button
                onClick={onClose}
                className="min-h-8 min-w-8 flex items-center justify-center text-ink-muted hover:text-ink-primary"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-ink-muted uppercase tracking-wide">
                  Título
                </label>
                <input
                  type="text"
                  defaultValue={task.title}
                  className="w-full mt-1 h-11 px-3 rounded-card border border-ink-muted/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-ink-muted uppercase tracking-wide">
                    Proceso
                  </label>
                  <input
                    type="text"
                    defaultValue={task.process}
                    className="w-full mt-1 h-11 px-3 rounded-card border border-ink-muted/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-muted uppercase tracking-wide">
                    Prioridad
                  </label>
                  <input
                    type="text"
                    defaultValue={task.priority}
                    className="w-full mt-1 h-11 px-3 rounded-card border border-ink-muted/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-ink-muted uppercase tracking-wide">
                  Notas
                </label>
                <textarea
                  rows={3}
                  placeholder="Agrega notas sobre esta tarea..."
                  className="w-full mt-1 p-3 rounded-card border border-ink-muted/20 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-ink-muted/20">
              <button
                onClick={onClose}
                className="text-sm text-ink-secondary hover:text-ink-primary"
              >
                Cancelar
              </button>
              <div className="flex gap-2">
                <button className="h-10 px-4 rounded-card border border-ink-muted/20 text-sm font-medium text-ink-secondary hover:bg-page-bg">
                  Guardar borrador
                </button>
                <button className="h-10 px-4 rounded-card bg-brand text-white text-sm font-medium hover:bg-brand-hover">
                  Finalizar proceso
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskEditModal;

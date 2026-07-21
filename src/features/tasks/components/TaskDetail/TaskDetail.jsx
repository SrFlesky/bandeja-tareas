import formatDate from "../../utils/formatDate";
import { cn } from "../../../../shared/utils/cn";
import {
  priorityColors,
  defaultPriorityColor,
} from "../../config/priorityColors";
import { PRIORITY_KEY_BY_LABEL } from "../../../../constants/taskPriority";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TaskDetail({ task, onClose }) {
  if (!task) return null;
  const priorityKey = PRIORITY_KEY_BY_LABEL[task.priority];
  const priorityColor = priorityColors[priorityKey] || defaultPriorityColor;

  return (
    <AnimatePresence>
      {task && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-10 md:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="
              fixed inset-0 z-20 bg-white overflow-y-auto
              md:inset-auto md:top-0 md:right-0 md:h-screen md:w-96
              md:border-l md:border-gray-200
            "
          >
            <div className="flex items-center justify-between mb-6 border-b pr-4 border-ink-muted/20">
              <h2 className="text-lg font-medium text-gray-900 p-5">
                Información relevante
              </h2>
              <button
                onClick={onClose}
                className="min-h-7 min-w-7 flex items-center transition-colors justify-center text-gray-400 hover:bg-tag-red-bg hover:text-tag-red rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-1">Detalles</p>
                <p className="text-2xl font-bold text-brand mb-1">
                  {task.title}
                </p>
                <p className="text-sm text-gray-700">Estado actual: ...</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-page-bg rounded-badge p-3">
                  <p className="text-xs text-ink-muted mb-1">Proceso</p>
                  <p className="text-sm font-semibold text-ink-primary">
                    {task.process}
                  </p>
                </div>
                <div className="bg-page-bg rounded-badge p-3">
                  <p className="text-xs text-ink-muted mb-1">Prioridad</p>
                  <p
                    className={cn(
                      "text-sm font-semibold, rounded-md",
                      priorityColor
                    )}
                  >
                    {task.priority}
                  </p>
                </div>
                <div className="bg-page-bg rounded-badge p-3">
                  <p className="text-xs text-ink-muted mb-1">Responsable</p>
                  <p className="text-sm font-semibold text-ink-primary">
                    {task.assignedTo}
                  </p>
                </div>
                <div className="bg-page-bg rounded-badge p-3">
                  <p className="text-xs text-ink-muted mb-1">Estado</p>
                  <p className="text-sm font-semibold text-ink-primary">
                    {task.status}
                  </p>
                </div>
                <div className="bg-page-bg rounded-badge p-3">
                  <p className="text-xs text-ink-muted mb-1">
                    Fecha de creación
                  </p>
                  <p className="text-sm font-semibold text-ink-primary">
                    {formatDate(task.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TaskDetail;

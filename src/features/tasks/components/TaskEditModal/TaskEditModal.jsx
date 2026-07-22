import { AnimatePresence, motion } from "framer-motion";
import TaskEditModalContent from "./TaskEditModalContent";

function TaskEditModal({ task, onClose, onSave }) {
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
            className="bg-white rounded-md w-full max-w-3xl max-h-[70vh] overflow-y-auto shadow-lg"
          >
            <TaskEditModalContent key={task.id} task={task} onClose={onClose} onSave={onSave} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskEditModal;

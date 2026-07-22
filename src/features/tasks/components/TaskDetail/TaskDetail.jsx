import { motion, AnimatePresence } from "framer-motion";
import TaskDetailContent from "./TaskDetailContent";

function TaskDetail({ task, onClose, onEdit }) {
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
            "
          >
            <div className="hidden md:block absolute top-0 left-0 h-full w-3 -translate-x-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />

            <TaskDetailContent task={task} onClose={onClose} onEdit={onEdit} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TaskDetail;

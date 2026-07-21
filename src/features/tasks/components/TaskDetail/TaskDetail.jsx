import formatDate from "../../utils/formatDate";

function TaskDetail({ task, onClose }) {
  if (!task) return null;

  return (
    <div
      className="
        fixed inset-0 z-20 bg-white overflow-y-auto p-5
        md:inset-auto md:top-0 md:right-0 md:h-screen md:w-96
        md:border-l md:border-gray-200
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          Información relevante
        </h2>
        <button
          onClick={onClose}
          className="min-h-11 min-w-11 flex items-center justify-center text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      
      <div className="mb-6">
        <p className="text-xs text-gray-500 mb-1">Título</p>
        <p className="text-2xl font-bold text-brand mb-1">{task.title}</p>
        <p className="text-sm text-gray-700">Estado actual: ...</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-page-bg rounded-card p-3">
          <p className="text-xs text-ink-muted mb-1">Proceso</p>
          <p className="text-sm font-semibold text-ink-primary">{task.process}</p>
        </div>
        <div className="bg-page-bg rounded-card p-3">
          <p className="text-xs text-ink-muted mb-1">Prioridad</p>
          <p className="text-sm font-semibold text-ink-primary">{task.priority}</p>
        </div>
        <div className="bg-page-bg rounded-card p-3">
          <p className="text-xs text-ink-muted mb-1">Responsable</p>
          <p className="text-sm font-semibold text-ink-primary">
            {task.assignedTo}
          </p>
        </div>
        <div className="bg-page-bg rounded-card p-3">
          <p className="text-xs text-ink-muted mb-1">Estado</p>
          <p className="text-sm font-semibold text-ink-primary">{task.status}</p>
        </div>
        <div className="bg-page-bg rounded-card p-3">
          <p className="text-xs text-ink-muted mb-1">Fecha de creación</p>
          <p className="text-sm font-semibold text-ink-primary">
            {formatDate(task.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;

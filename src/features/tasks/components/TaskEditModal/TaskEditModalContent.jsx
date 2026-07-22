import { useState } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "../../../../shared/utils/cn";
import { TASK_PROCESS_LIST } from "../../../../constants/taskProcess";
import { TASK_PRIORITY_LIST } from "../../../../constants/taskPriority";
import { TASK_STATUS_LIST } from "../../../../constants/taskStatus";
import ActivityTimeline from "../ActivityTimeline/ActivityTimeline";

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-medium text-ink-muted uppercase tracking-wide">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

const selectClass =
  "w-full h-11 px-3 rounded-md border border-ink-muted/20 bg-white text-sm text-ink-primary focus:outline-none focus:border-brand/40";

const inputClass =
  "w-full h-11 px-3 rounded-md border border-ink-muted/20 text-sm text-ink-primary focus:outline-none focus:border-brand/40";

function TaskEditModalContent({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [process, setProcess] = useState(task.process);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [notes, setNotes] = useState(task.notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const [activityLog, setActivityLog] = useState(
    task.activityLog?.length
      ? [...task.activityLog].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      : [{ id: "created", text: "Creación de la tarea", date: task.createdAt }]
  );
  const [newActivity, setNewActivity] = useState("");

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    setActivityLog((prev) => [
      {
        id: Date.now(),
        text: newActivity.trim(),
        date: new Date().toISOString(),
      },
      ...prev,
    ]);
    setNewActivity("");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(task.id, { title, process, priority, status, notes, activityLog });
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-ink-muted/20">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-ink-primary">
            Gestión de tarea
          </h2>
        </div>
        <button
          onClick={onClose}
          className="min-h-8 min-w-8 flex items-center justify-center text-ink-muted hover:text-ink-primary transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_280px]">
        {/* Columna izquierda — formulario */}
        <div className="p-6 flex flex-col gap-4 md:border-r md:border-ink-muted/15">
          <Field label="Título">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Proceso">
              <select
                value={process}
                onChange={(e) => setProcess(e.target.value)}
                className={selectClass}
              >
                {TASK_PROCESS_LIST.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Prioridad">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={selectClass}
              >
                {TASK_PRIORITY_LIST.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Estado">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={selectClass}
            >
              {TASK_STATUS_LIST.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Notas">
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Agrega notas sobre esta tarea..."
              className={cn(inputClass, "h-auto py-2 resize-none")}
            />
          </Field>
        </div>

        {/* Columna derecha — resumen de actividad, editable */}
        <div className="p-6 flex flex-col gap-4 bg-page-bg/40 md:bg-transparent">
          <p className="text-xs font-medium text-ink-muted uppercase tracking-wide">
            Resumen de actividad
          </p>

          <ActivityTimeline activityLog={activityLog} />

          <form
            onSubmit={handleAddActivity}
            className="flex flex-col gap-2 pt-2 border-t border-ink-muted/15"
          >
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Agregar actividad..."
              className="w-full h-9 px-3 rounded-md border border-ink-muted/20 text-xs focus:outline-none focus:border-brand/40"
            />
            <button
              type="submit"
              className="h-9 flex items-center justify-center gap-1.5 rounded-md border border-ink-muted/20 text-xs font-medium text-ink-secondary hover:bg-page-bg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Agregar
            </button>
          </form>
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
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="h-10 px-4 rounded-sm bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-60"
          >
            {isSaving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskEditModalContent;

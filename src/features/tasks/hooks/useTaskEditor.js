import { useSearchParams } from "react-router-dom";
import { useTaskStore } from "../store/useTaskStore";

export function useTaskEditor() {
  const [searchParams, setSearchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const tasks = useTaskStore((state) => state.tasks);

  const editingTask = editId
    ? tasks.find((t) => String(t.id) === editId)
    : null;

  const openEditor = (id) => {
    const next = new URLSearchParams(searchParams);
    next.set("edit", id);
    setSearchParams(next);
  };

  const closeEditor = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("edit");
    setSearchParams(next);
  };

  return { editingTask, openEditor, closeEditor };
}

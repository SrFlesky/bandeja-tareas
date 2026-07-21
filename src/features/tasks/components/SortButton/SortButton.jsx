import { cn } from "../../../../shared/utils/cn";

function SortButton({ sortOrder, toggleSort }) {
  return (
    <button
      className={cn(
        "h-11 w-30 px-4 rounded-pill text-sm font-medium transition-colors",
        sortOrder === "asc"
          ? "bg-tag-red-bg text-brand border-transparent"
          : "bg-white text-ink-muted hover:bg-page-bg"
      )}
      onClick={toggleSort}
    >
      {sortOrder === "asc" ? "Fecha ↑" : "Fecha ↓"}
    </button>
  );
}

export default SortButton;

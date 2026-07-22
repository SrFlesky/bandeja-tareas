import { cn } from "../../../../shared/utils/cn";
import { CircleArrowUp } from "lucide-react";
import { CircleArrowDown } from "lucide-react";

function SortButton({ sortOrder, toggleSort }) {
  return (
    <button
      className={cn(
        "h-11 w-30 px-4 rounded-md text-sm font-medium transition-colors",
        "inline-flex justify-center items-center gap-1.5 whitespace-nowrap",
        sortOrder === "asc"
          ? "bg-tag-red-bg text-brand border-transparent"
          : "bg-white text-ink-muted hover:bg-tag-red-bg hover:text-tag-red"
      )}
      onClick={toggleSort}
    >
      {sortOrder === "asc" ? (
        <>
          Fecha <CircleArrowUp className="w-4 h-4" />
        </>
      ) : (
        <>
          Fecha <CircleArrowDown className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

export default SortButton;

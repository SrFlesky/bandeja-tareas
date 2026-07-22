import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../../shared/utils/cn";

function Pagination({ page, totalPages, totalItems, onPageChange }) {
  const [jumpValue, setJumpValue] = useState("");

  if (totalPages <= 1) return null;

  const handleJump = (e) => {
    e.preventDefault();
    const target = Number(jumpValue);
    if (target >= 1 && target <= totalPages) {
      onPageChange(target);
      setJumpValue("");
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span className="text-xs text-ink-muted whitespace-nowrap">
        {(page - 1) * 20 + 1}–{Math.min(page * 20, totalItems)} de {totalItems}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="min-h-8 min-w-8 flex items-center justify-center rounded-full text-ink-muted hover:bg-page-bg hover:text-ink-primary transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <form onSubmit={handleJump} className="flex items-center gap-1 mx-1">
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            onFocus={(e) => e.target.select()}
            placeholder={String(page)}
            className="w-10 h-7 text-center text-xs bg-transparent rounded-md focus:outline-none focus:bg-page-bg transition-colors"
          />
          <span className="text-xs text-ink-muted whitespace-nowrap">
            de {totalPages}
          </span>
        </form>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="min-h-8 min-w-8 flex items-center justify-center rounded-full text-ink-muted hover:bg-page-bg hover:text-ink-primary transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;

import { useState, useRef, useEffect } from "react";
import { filterConfig } from "../../config/filterConfig";
import { cn } from "../../../../shared/utils/cn";
import { ListFilter } from "lucide-react";

function FilterBar({ filters, toggleFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const activeCount = Object.values(filters).flat().length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (field, option) => {
    toggleFilter(field, option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "h-11 px-4 rounded-pill text-sm font-medium transition-colors",
          "inline-flex items-center gap-1.5 whitespace-nowrap",
          activeCount > 0
            ? "bg-tag-red-bg text-brand border-transparent"
            : "bg-white text-ink-muted hover:bg-page-bg"
        )}
      >
        <ListFilter className="w-4 h-4" />
        {activeCount > 0 && `(${activeCount})`}
      </button>

      {isOpen && (
        <div
          className="
            fixed inset-x-4 top-1/2 -translate-y-100 z-20
            md:absolute md:inset-x-auto md:top-full md:translate-y-0 md:right-0 md:mt-2
            max-h-96 overflow-y-auto
            w-auto md:w-72
            bg-white rounded-card border border-ink-muted/15
            shadow-lg p-4
          "
        >
          {filterConfig.map(({ field, label, options }, index) => (
            <div
              key={field}
              className={cn(
                index > 0 && "mt-4 pt-4 border-t border-ink-muted/10"
              )}
            >
              <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">
                {label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {options.map((option) => {
                  const isActive = filters[field].includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(field, option)}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-pill border transition-colors",
                        isActive
                          ? "bg-brand text-white border-transparent font-medium"
                          : "bg-page-bg text-ink-secondary border-transparent hover:border-ink-muted/30"
                      )}
                    >
                      {option}
                      {isActive && " ×"}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterBar;

import { useState, useRef, useEffect } from "react";
import { filterConfig } from "../../config/filterConfig";

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

  return (
    <div style={{ position: "relative" }} ref={panelRef}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        Filtro {activeCount > 0 && `(${activeCount})`}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            marginTop: 8,
            zIndex: 10,
            background: "white"
          }}
        >
          {filterConfig.map(({ field, label, options }) => (
            <div key={field}>
              <p>{label}</p>
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter(field, option)}
                  style={{
                    background: filters[field].includes(option)
                      ? "var(--bg-accent)"
                      : "transparent",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterBar;

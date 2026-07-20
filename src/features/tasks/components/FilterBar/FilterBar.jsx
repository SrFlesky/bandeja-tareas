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

  const handleOptionClick = (field, option) => {
    toggleFilter(field, option);
    setIsOpen(false);
  };

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
              {options.map((option) => {
                const isActive = filters[field].includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(field, option)}
                    style={{
                      background: isActive ? "var(--bg-accent)" : "transparent",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {option}
                    {isActive && " ×"}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterBar;

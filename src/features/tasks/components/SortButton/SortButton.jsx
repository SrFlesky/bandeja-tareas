function SortButton({ sortOrder, toggleSort }) {
  return (
    <button onClick={toggleSort}>
        {sortOrder === "asc" ? "Fecha ↑" : "Fecha ↓"}
    </button>
  );
}

export default SortButton;

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar"
      className="w-full h-11 pl-5 pr-4 bg-white 
      text-sm text-ink-primary placeholder:text-ink-muted 
      rounded-md border border-transparent 
      focus:outline-none focus:border-tag-red/40 focus:border-[2px] focus:bg-white transition-colors"
    />
  );
}

export default SearchBar;

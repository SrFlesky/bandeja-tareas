function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar"
      className="w-full h-11 pl-5 pr-4 bg-page-bg 
      text-sm text-ink-primary placeholder:text-ink-muted 
      rounded-pill border border-transparent 
      focus:outline-none focus:border-brand/40 focus:bg-white transition-colors"
    />
  );
}

export default SearchBar;

function ChapterSearch({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="input-group chapter-search">
      <span className="input-group-text bg-white">
        <i className="bi bi-search"></i>
      </span>

      <input
        type="search"
        className="form-control"
        placeholder="Search chapters..."
        value={searchTerm}
        onChange={(event) =>
          setSearchTerm(event.target.value)
        }
      />
    </div>
  );
}

export default ChapterSearch;
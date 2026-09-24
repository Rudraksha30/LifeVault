function TimelineFilters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  year,
  setYear,
  mediaType,
  setMediaType,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-3">
        <div className="row g-2">

          <div className="col-12 col-lg-4">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="search"
                className="form-control"
                placeholder="Search memories..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select"
              value={year}
              onChange={(event) =>
                setYear(event.target.value)
              }
            >
              <option value="all">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option value="all">All Categories</option>
              <option value="Education">Education</option>
              <option value="Career">Career</option>
              <option value="Travel">Travel</option>
              <option value="College">College</option>
              <option value="Projects">Projects</option>
            </select>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select"
              value={mediaType}
              onChange={(event) =>
                setMediaType(event.target.value)
              }
            >
              <option value="all">All Media</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value)
              }
            >
              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TimelineFilters;
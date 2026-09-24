function AchievementFilters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  year,
  setYear,
}) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-3">
        <div className="row g-2">

          <div className="col-12 col-lg-6">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="search"
                className="form-control"
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-3">
            <select
              className="form-select"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option value="all">
                All Categories
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Career">
                Career
              </option>

              <option value="Projects">
                Projects
              </option>

              <option value="Competition">
                Competition
              </option>

              <option value="Personal">
                Personal
              </option>
            </select>
          </div>

          <div className="col-6 col-md-3 col-lg-3">
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

        </div>
      </div>
    </div>
  );
}

export default AchievementFilters;
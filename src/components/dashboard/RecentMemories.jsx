function RecentMemories() {
  const memories = [
    {
      id: 1,
      icon: "bi-mortarboard",
      title: "Graduation Day",
      date: "18 August 2026",
      category: "Education",
    },
    {
      id: 2,
      icon: "bi-briefcase",
      title: "First Internship",
      date: "15 June 2026",
      category: "Career",
    },
    {
      id: 3,
      icon: "bi-airplane",
      title: "Goa Trip",
      date: "2 May 2026",
      category: "Travel",
    },
  ];

  return (
    <div className="card border-0 shadow-sm h-100 dashboard-card">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="text-secondary small mb-1">
              Your Journey
            </p>

            <h3 className="h5 fw-bold mb-0">
              Recent Memories
            </h3>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-light"
          >
            View All
          </button>
        </div>

        <div className="d-flex flex-column gap-3">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="d-flex align-items-center gap-3 p-3 rounded-3 dashboard-list-item"
            >
              <div className="dashboard-memory-icon">
                <i className={`bi ${memory.icon}`}></i>
              </div>

              <div className="flex-grow-1">
                <h4 className="h6 fw-semibold mb-1">
                  {memory.title}
                </h4>

                <div className="d-flex flex-wrap gap-2">
                  <small className="text-secondary">
                    {memory.date}
                  </small>

                  <span className="badge text-bg-light">
                    {memory.category}
                  </span>
                </div>
              </div>

              <i className="bi bi-chevron-right text-secondary"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentMemories;
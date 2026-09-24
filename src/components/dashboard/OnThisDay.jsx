function OnThisDay() {
  const memories = [
    {
      id: 1,
      year: "2025",
      title: "Completed my Java project",
      icon: "bi-code-slash",
    },
    {
      id: 2,
      year: "2024",
      title: "College festival with friends",
      icon: "bi-people",
    },
  ];

  return (
    <div className="card border-0 shadow-sm h-100 dashboard-card">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="dashboard-section-icon">
            <i className="bi bi-clock-history"></i>
          </div>

          <div>
            <p className="text-secondary small mb-1">
              Looking Back
            </p>

            <h3 className="h5 fw-bold mb-0">
              On This Day
            </h3>
          </div>
        </div>

        {memories.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {memories.map((memory) => (
              <div
                key={memory.id}
                className="p-3 rounded-3 dashboard-list-item"
              >
                <div className="d-flex align-items-center gap-3">
                  <i
                    className={`bi ${memory.icon} fs-5`}
                  ></i>

                  <div>
                    <small className="text-secondary">
                      {memory.year}
                    </small>

                    <p className="mb-0 fw-semibold">
                      {memory.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="bi bi-calendar3 fs-2 text-secondary"></i>

            <p className="text-secondary mt-2 mb-0">
              Nothing from this day yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnThisDay;
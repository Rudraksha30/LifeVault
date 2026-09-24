function GoalProgress() {
  const goals = [
    {
      id: 1,
      title: "Become Full Stack Developer",
      completed: 5,
      total: 8,
    },
    {
      id: 2,
      title: "Complete 5 Projects",
      completed: 4,
      total: 5,
    },
    {
      id: 3,
      title: "Learn Spring Boot",
      completed: 2,
      total: 6,
    },
  ];

  return (
    <div className="card border-0 shadow-sm h-100 dashboard-card">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="text-secondary small mb-1">
              Keep Moving Forward
            </p>

            <h3 className="h5 fw-bold mb-0">
              Active Goals
            </h3>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-light"
          >
            View All
          </button>
        </div>

        <div className="d-flex flex-column gap-4">
          {goals.map((goal) => {
            const progress =
              (goal.completed / goal.total) * 100;

            return (
              <div key={goal.id}>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold small">
                    {goal.title}
                  </span>

                  <span className="text-secondary small">
                    {Math.round(progress)}%
                  </span>
                </div>

                <div
                  className="progress"
                  style={{ height: "8px" }}
                >
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <small className="text-secondary">
                  {goal.completed} of {goal.total} milestones
                  completed
                </small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GoalProgress;
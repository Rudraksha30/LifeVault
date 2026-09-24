function QuickActions() {
  const actions = [
    {
      icon: "bi-camera",
      label: "Add Memory",
    },
    {
      icon: "bi-trophy",
      label: "Add Achievement",
    },
    {
      icon: "bi-bullseye",
      label: "Create Goal",
    },
    {
      icon: "bi-file-earmark-plus",
      label: "Upload Document",
    },
  ];

  return (
    <div className="card border-0 shadow-sm dashboard-card">
      <div className="card-body p-4">
        <p className="text-secondary small mb-1">
          Quick Actions
        </p>

        <h3 className="h5 fw-bold mb-4">
          Add Something
        </h3>

        <div className="row g-2">
          {actions.map((action) => (
            <div className="col-6" key={action.label}>
              <button
                type="button"
                className="btn btn-outline-dark w-100 py-3"
              >
                <i
                  className={`bi ${action.icon} d-block fs-5 mb-1`}
                ></i>

                <small>{action.label}</small>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickActions;
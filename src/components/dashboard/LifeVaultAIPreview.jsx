function LifeVaultAIPreview() {
  const actions = [
    {
      icon: "bi-stars",
      label: "Organize Memory",
    },
    {
      icon: "bi-bullseye",
      label: "Create Goal",
    },
    {
      icon: "bi-book",
      label: "Summarize Chapter",
    },
  ];

  return (
    <div className="card border-0 shadow-sm dashboard-ai-card">
      <div className="card-body p-4 p-lg-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="dashboard-ai-icon">
                <i className="bi bi-stars"></i>
              </span>

              <span className="small fw-semibold">
                LifeVault AI
              </span>
            </div>

            <h3 className="h4 fw-bold mb-2">
              Let AI help organize your journey.
            </h3>

            <p className="text-secondary mb-0">
              Organize memories, create goal milestones,
              summarize chapters, and understand your
              personal archive.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="d-flex flex-column gap-2">
              {actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="btn btn-light text-start d-flex align-items-center gap-3"
                >
                  <i className={`bi ${action.icon}`}></i>
                  {action.label}
                  <i className="bi bi-arrow-right ms-auto"></i>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LifeVaultAIPreview;
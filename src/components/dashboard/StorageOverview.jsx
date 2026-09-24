function StorageOverview({
  usedStorage = 4.2,
  totalStorage = 10,
}) {
  const percentage = Math.min(
    (usedStorage / totalStorage) * 100,
    100
  );

  return (
    <div className="card border-0 shadow-sm h-100 dashboard-card">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-secondary small mb-1">
              Storage
            </p>

            <h3 className="h5 fw-bold mb-0">
              {Number(usedStorage).toFixed(2)} GB / {totalStorage} GB
            </h3>
          </div>

          <div className="dashboard-section-icon">
            <i className="bi bi-cloud"></i>
          </div>
        </div>

        <div
          className="progress mb-3"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ height: "10px" }}
        >
          <div
            className="progress-bar"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="d-flex justify-content-between">
          <small className="text-secondary">
            {percentage.toFixed(0)}% used
          </small>

          <small className="fw-semibold">
            {(totalStorage - usedStorage).toFixed(1)} GB free
          </small>
        </div>

        <button
          type="button"
          className="btn btn-outline-dark btn-sm mt-4"
        >
          <i className="bi bi-cloud-plus me-2"></i>
          Manage Storage
        </button>
      </div>
    </div>
  );
}

export default StorageOverview;
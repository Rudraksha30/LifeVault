import {
  calculateStoragePercentage,
  getRemainingStorage,
} from "../../services/storageService";

function StorageOverview({ usedGB, totalGB }) {
  const percentage = calculateStoragePercentage(usedGB, totalGB);

  const remaining = getRemainingStorage(usedGB, totalGB);

  return (
    <div className="card border-0 shadow-sm storage-overview-card">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
          <div>
            <p className="text-secondary small mb-1">Your Storage</p>

            <h3 className="h4 fw-bold mb-1">
              {usedGB.toFixed(2)} GB
              <span className="text-secondary fw-normal fs-6">
                {" "}
                / {totalGB} GB
              </span>
            </h3>

            <p className="text-secondary mb-0">
              {remaining.toFixed(2)} GB remaining
            </p>
          </div>

          <div className="storage-main-icon">
            <i className="bi bi-cloud"></i>
          </div>
        </div>

        <div className="progress mb-2">
          <div
            className="progress-bar"
            style={{
              width: `${percentage}%`,
            }}
          ></div>
        </div>

        <div className="d-flex justify-content-between">
          <small className="text-secondary">
            {percentage.toFixed(1)}% used
          </small>

          <small className="text-secondary">Maximum allowed: 1 TB</small>
        </div>
      </div>
    </div>
  );
}

export default StorageOverview;

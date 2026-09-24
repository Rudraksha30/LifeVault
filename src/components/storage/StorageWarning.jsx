import { useStorage } from "../../context/StorageContext";

function StorageWarning() {
  const { getStorageStatus, dismissedWarningLevel, dismissStorageWarning } =
    useStorage();

  const status = getStorageStatus();

  // No warning below 80%.
  if (status.level === "normal") {
    return null;
  }

  // Don't show the same warning again
  // after the user dismissed it.
  if (dismissedWarningLevel === status.level) {
    return null;
  }

  const config = {
    warning: {
      className: "alert alert-warning",
      icon: "bi-exclamation-circle",
      title: "Storage Getting Full",
    },

    critical: {
      className: "alert alert-danger",
      icon: "bi-exclamation-triangle",
      title: "Storage Almost Full",
    },

    full: {
      className: "alert alert-danger",
      icon: "bi-x-circle-fill",
      title: "Storage Full",
    },
  };

  const currentConfig = config[status.level];

  return (
    <div
      className={`${currentConfig.className} d-flex align-items-start gap-3`}
      role="alert"
    >
      <i className={`bi ${currentConfig.icon} fs-5`}></i>

      <div className="flex-grow-1">
        <strong>{currentConfig.title}</strong>

        <p className="mb-1">{status.message}</p>

        <small>
          {status.percentage.toFixed(2)}% of your storage is currently used.
        </small>
      </div>

      <button
        type="button"
        className="btn-close"
        aria-label="Dismiss storage warning"
        onClick={() => dismissStorageWarning(status.level)}
      ></button>
    </div>
  );
}

export default StorageWarning;
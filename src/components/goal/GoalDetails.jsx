import {
  calculateGoalProgress,
  getCompletedMilestones,
  getTotalMilestones,
  getGoalStatus,
} from "../../utils/goalCalculator";

function GoalDetails({ goal, onClose, onToggleMilestone }) {
  if (!goal) {
    return null;
  }

  const progress = calculateGoalProgress(goal);

  const completed = getCompletedMilestones(goal);

  const total = getTotalMilestones(goal);

  const status = getGoalStatus(goal);

  const formattedTargetDate = goal.targetDate
    ? new Date(goal.targetDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "No target date";

  return (
    <div
      className="lifevault-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="goal-details-title"
      onClick={onClose}
    >
      <div
        className="lifevault-modal-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lifevault-modal-content shadow">
          {/* HEADER */}
          <div className="modal-header lifevault-modal-header">
            <div>
              <h5 id="goal-details-title" className="modal-title fw-bold">
                {goal.title}
              </h5>

              <small className="text-secondary">{goal.category}</small>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* BODY */}
          <div className="lifevault-modal-body">
            <div className="d-flex flex-wrap gap-2 mb-4">
              <span
                className={`badge ${
                  status === "completed"
                    ? "text-bg-success"
                    : status === "overdue"
                      ? "text-bg-danger"
                      : "text-bg-light"
                }`}
              >
                {status}
              </span>

              <span className="badge text-bg-light">
                Target: {formattedTargetDate}
              </span>
            </div>

            {goal.description && (
              <p className="text-secondary mb-4">{goal.description}</p>
            )}

            {/* PROGRESS */}
            <div className="p-4 rounded-3 bg-light mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>Overall Progress</strong>

                <strong>{progress}%</strong>
              </div>

              <div
                className="progress mb-2"
                style={{
                  height: "10px",
                }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>

              <small className="text-secondary">
                {completed} of {total} milestones completed
              </small>
            </div>

            {/* MILESTONES */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Milestones</h6>

              <button type="button" className="btn btn-sm btn-outline-dark">
                <i className="bi bi-plus-lg me-1"></i>
                Add Milestone
              </button>
            </div>

            <div className="d-flex flex-column gap-2">
              {goal.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`goal-milestone ${
                    milestone.isCompleted ? "completed" : ""
                  }`}
                >
                  <div className="form-check flex-grow-1">
                    <input
                      id={`goal-milestone-${milestone.id}`}
                      type="checkbox"
                      className="form-check-input"
                      checked={milestone.isCompleted}
                      onChange={() => onToggleMilestone(goal.id, milestone.id)}
                    />

                    <label
                      htmlFor={`goal-milestone-${milestone.id}`}
                      className="form-check-label"
                    >
                      {milestone.title}
                    </label>
                  </div>

                  {milestone.completedDate && (
                    <small className="text-secondary">
                      {new Date(milestone.completedDate).toLocaleDateString(
                        "en-IN",
                      )}
                    </small>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer lifevault-modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Close
            </button>

            <button type="button" className="btn btn-outline-dark">
              <i className="bi bi-pencil me-2"></i>
              Edit Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalDetails;

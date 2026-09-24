import {
    calculateGoalProgress,
    getCompletedMilestones,
    getTotalMilestones,
    getGoalStatus,
} from "../../utils/goalCalculator";

function GoalCard({ goal, onView }) {
    const progress = calculateGoalProgress(goal);
    const completed = getCompletedMilestones(goal);
    const total = getTotalMilestones(goal);
    const status = getGoalStatus(goal);

    return (
        <div className="col-12 col-md-6 col-xl-4">
            <div className="card border-0 shadow-sm goal-card h-100">
                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="goal-icon">
                            <i className="bi bi-bullseye"></i>
                        </div>

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
                    </div>

                    <h3 className="h5 fw-bold mb-2">
                        {goal.title}
                    </h3>

                    <p className="text-secondary small goal-description">
                        {goal.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-secondary">
                            {completed} of {total} milestones
                        </small>

                        <strong>{progress}%</strong>
                    </div>

                    <div
                        className="progress mb-3"
                        style={{ height: "8px" }}
                    >
                        <div
                            className="progress-bar"
                            style={{
                                width: `${progress}%`,
                            }}
                        ></div>
                    </div>

                    <span className="badge text-bg-light mb-4">
                        {goal.category}
                    </span>

                    <button
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => onView(goal)}
                    >
                        View Goal
                        <i className="bi bi-arrow-right ms-2"></i>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default GoalCard;
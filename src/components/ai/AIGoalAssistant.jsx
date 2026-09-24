import { useState } from "react";
import { generateGoalMilestones } from "../../services/aiService";
import AIResponse from "./AIResponse";

function AIGoalAssistant() {
  const [goal, setGoal] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [error, setError] = useState("");

  function handleGenerate() {
    const response = generateGoalMilestones(goal);

    if (!response.success) {
      setError(response.message);

      setMilestones([]);

      return;
    }

    setError("");

    setMilestones(response.milestones);
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h3 className="h5 fw-bold">🎯 Build a Goal with AI</h3>

        <p className="text-secondary">
          Enter a goal and LifeVault will suggest milestones to help you achieve
          it.
        </p>

        <input
          type="text"
          className="form-control"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Example: Become a Full Stack Developer"
        />

        <button
          type="button"
          className="btn btn-dark mt-3"
          onClick={handleGenerate}
        >
          <i className="bi bi-stars me-2"></i>
          Suggest Milestones
        </button>

        {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}

        {milestones.length > 0 && (
          <AIResponse title="Suggested Milestones">
            <div className="d-flex flex-column gap-2">
              {milestones.map((milestone, index) => (
                <div key={index} className="ai-milestone">
                  <span className="ai-milestone-number">{index + 1}</span>

                  <span>{milestone}</span>
                </div>
              ))}
            </div>
          </AIResponse>
        )}
      </div>
    </div>
  );
}

export default AIGoalAssistant;

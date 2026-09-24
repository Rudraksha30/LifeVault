import { useState } from "react";

function CreateGoalModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [targetDate, setTargetDate] = useState("");

  const [milestones, setMilestones] = useState([""]);

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "description") {
      setDescription(value);
    }

    if (name === "category") {
      setCategory(value);
    }

    if (name === "targetDate") {
      setTargetDate(value);
    }

    if (error) {
      setError("");
    }
  }

  function updateMilestone(index, value) {
    setMilestones((previous) =>
      previous.map((milestone, itemIndex) =>
        itemIndex === index ? value : milestone,
      ),
    );
  }

  function addMilestone() {
    setMilestones((previous) => [...previous, ""]);
  }

  function removeMilestone(index) {
    setMilestones((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Goal title is required.");
      return;
    }

    const cleanedMilestones = milestones
      .map((milestone) => milestone.trim())
      .filter(Boolean);

    if (cleanedMilestones.length === 0) {
      setError("Add at least one milestone.");
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      category,
      targetDate: targetDate || null,

      milestones: cleanedMilestones.map((milestone) => ({
        id: Date.now() + Math.random(),

        title: milestone,
        isCompleted: false,
        completedDate: null,
      })),
    });
  }

  return (
    <div
      className="lifevault-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-goal-title"
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
              <h5 id="create-goal-title" className="modal-title fw-bold">
                Create Goal
              </h5>

              <small className="text-secondary">
                Turn your plans into achievable milestones.
              </small>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column flex-grow-1"
          >
            {/* SCROLLABLE BODY */}
            <div className="lifevault-modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label htmlFor="goalTitle" className="form-label">
                  Goal Title *
                </label>

                <input
                  id="goalTitle"
                  name="title"
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={handleChange}
                  placeholder="e.g. Become Full Stack Developer"
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="goalCategory" className="form-label">
                    Category
                  </label>

                  <select
                    id="goalCategory"
                    name="category"
                    className="form-select"
                    value={category}
                    onChange={handleChange}
                  >
                    <option value="Personal">Personal</option>

                    <option value="Career">Career</option>

                    <option value="Education">Education</option>

                    <option value="Projects">Projects</option>

                    <option value="Finance">Finance</option>

                    <option value="Travel">Travel</option>

                    <option value="Skills">Skills</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="goalTargetDate" className="form-label">
                    Target Date
                  </label>

                  <input
                    id="goalTargetDate"
                    name="targetDate"
                    type="date"
                    className="form-control"
                    value={targetDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="goalDescription" className="form-label">
                  Description
                </label>

                <textarea
                  id="goalDescription"
                  name="description"
                  rows="4"
                  className="form-control"
                  value={description}
                  onChange={handleChange}
                  placeholder="Describe what you want to achieve..."
                ></textarea>
              </div>

              {/* MILESTONES */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label mb-0">Milestones *</label>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark"
                    onClick={addMilestone}
                  >
                    <i className="bi bi-plus-lg me-1"></i>
                    Add Milestone
                  </button>
                </div>

                <div className="d-flex flex-column gap-2">
                  {milestones.map((milestone, index) => (
                    <div className="input-group" key={index}>
                      <span className="input-group-text">{index + 1}</span>

                      <input
                        type="text"
                        className="form-control"
                        value={milestone}
                        onChange={(event) =>
                          updateMilestone(index, event.target.value)
                        }
                        placeholder={`Milestone ${index + 1}`}
                      />

                      {milestones.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeMilestone(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer lifevault-modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-dark">
                <i className="bi bi-bullseye me-2"></i>
                Create Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateGoalModal;

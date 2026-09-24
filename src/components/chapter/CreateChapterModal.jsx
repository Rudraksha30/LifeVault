import { useEffect, useState } from "react";
import "../../styles/modal.css";

function CreateChapterModal({
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    icon: "📖",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Chapter name is required.");
      return;
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      setError(
        "End date cannot be earlier than the start date."
      );
      return;
    }

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: "active",
      coverImage: null,
    });
  }

  return (
    <div
      className="lifevault-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-chapter-title"
      onClick={onClose}
    >
      <div
        className="lifevault-modal-dialog"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="lifevault-modal-content shadow">

          <div className="modal-header lifevault-modal-header">
            <div>
              <h5
                id="create-chapter-title"
                className="modal-title fw-bold"
              >
                Create Chapter
              </h5>

              <small className="text-secondary">
                Organize a meaningful part of your life.
              </small>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column flex-grow-1"
          >
            <div className="lifevault-modal-body">

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label
                  htmlFor="chapterTitle"
                  className="form-label"
                >
                  Chapter Name *
                </label>

                <input
                  id="chapterTitle"
                  name="title"
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. College Life"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="chapterDescription"
                  className="form-label"
                >
                  Description
                </label>

                <textarea
                  id="chapterDescription"
                  name="description"
                  rows="4"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this chapter..."
                ></textarea>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    htmlFor="chapterStartDate"
                    className="form-label"
                  >
                    Start Date
                  </label>

                  <input
                    id="chapterStartDate"
                    name="startDate"
                    type="date"
                    className="form-control"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="chapterEndDate"
                    className="form-label"
                  >
                    End Date
                  </label>

                  <input
                    id="chapterEndDate"
                    name="endDate"
                    type="date"
                    className="form-control"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label
                    htmlFor="chapterIcon"
                    className="form-label"
                  >
                    Chapter Icon
                  </label>

                  <select
                    id="chapterIcon"
                    name="icon"
                    className="form-select"
                    value={formData.icon}
                    onChange={handleChange}
                  >
                    <option value="📖">📖 General</option>
                    <option value="🎓">🎓 Education</option>
                    <option value="💼">💼 Career</option>
                    <option value="✈️">✈️ Travel</option>
                    <option value="👨‍👩‍👦">👨‍👩‍👦 Family</option>
                    <option value="💻">💻 Projects</option>
                    <option value="🎮">🎮 Gaming</option>
                    <option value="🌱">🌱 Personal Growth</option>
                    <option value="🏆">🏆 Achievements</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer lifevault-modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-dark"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Create Chapter
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default CreateChapterModal;
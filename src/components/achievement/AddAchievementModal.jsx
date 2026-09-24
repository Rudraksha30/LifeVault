import { useEffect, useState } from "react";

import FileUploader from "../common/FileUploader";

function AddAchievementModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "Education",
    description: "",
    issuer: "",
    importance: "Normal",
    featured: false,
    proofFile: null,
    proofAttached: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Achievement title is required.");
      return;
    }

    if (!formData.date) {
      setError("Achievement date is required.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      issuer: formData.issuer.trim(),
    });
  }

  return (
    <div
      className="lifevault-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-achievement-title"
      onClick={onClose}
    >
      <div
        className="lifevault-modal-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lifevault-modal-content shadow">
          <div className="modal-header lifevault-modal-header">
            <div>
              <h5 id="add-achievement-title" className="modal-title fw-bold">
                Add Achievement
              </h5>

              <small className="text-secondary">
                Record something you're proud of.
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
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label htmlFor="achievementTitle" className="form-label">
                  Achievement Title *
                </label>

                <input
                  id="achievementTitle"
                  name="title"
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. BSc IT Graduation"
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="achievementDate" className="form-label">
                    Date Achieved *
                  </label>

                  <input
                    id="achievementDate"
                    name="date"
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="achievementCategory" className="form-label">
                    Category *
                  </label>

                  <select
                    id="achievementCategory"
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Education">Education</option>

                    <option value="Career">Career</option>

                    <option value="Projects">Projects</option>

                    <option value="Competition">Competition</option>

                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="achievementIssuer" className="form-label">
                    Issued By
                  </label>

                  <input
                    id="achievementIssuer"
                    name="issuer"
                    type="text"
                    className="form-control"
                    value={formData.issuer}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="achievementImportance" className="form-label">
                    Importance
                  </label>

                  <select
                    id="achievementImportance"
                    name="importance"
                    className="form-select"
                    value={formData.importance}
                    onChange={handleChange}
                  >
                    <option value="Normal">Normal</option>

                    <option value="Major">Major</option>
                  </select>
                </div>

                <div className="col-12">
                  <label
                    htmlFor="achievementDescription"
                    className="form-label"
                  >
                    Description
                  </label>

                  <textarea
                    id="achievementDescription"
                    name="description"
                    rows="4"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what you achieved..."
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label">Proof / Certificate</label>

                  <FileUploader
                    multiple={false}
                    accept="
                      image/*,
                      video/*,
                      application/pdf
                    "
                    onFilesChange={(files) => {
                      const selectedFile = files[0] || null;

                      setFormData((previous) => ({
                        ...previous,
                        proofFile: selectedFile,
                        proofAttached: Boolean(selectedFile),
                      }));
                    }}
                  />
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      id="featuredAchievement"
                      name="featured"
                      type="checkbox"
                      className="form-check-input"
                      checked={formData.featured}
                      onChange={handleChange}
                    />

                    <label
                      htmlFor="featuredAchievement"
                      className="form-check-label"
                    >
                      Mark as Featured Achievement
                    </label>
                  </div>
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

              <button type="submit" className="btn btn-dark">
                <i className="bi bi-trophy me-2"></i>
                Save Achievement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAchievementModal;

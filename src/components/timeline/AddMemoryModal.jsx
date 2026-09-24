import { useEffect, useState } from "react";
import "../../styles/modal.css";

import FileUploader from "../common/FileUploader";

function AddMemoryModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
    category: "Personal",
    importance: "Normal",
    media: [],
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    // Prevent the Timeline/background from scrolling
    document.body.style.overflow = "hidden";

    return () => {
      // Restore the previous body scrolling behavior
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Memory title is required.");
      return;
    }

    if (!formData.date) {
      setError("Memory date is required.");
      return;
    }

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
    });
  }

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-memory-title"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1050,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflow: "hidden",
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg"
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "calc(100vh - 2rem)",
          maxHeight: "calc(100vh - 2rem)",
          margin: "0 auto",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="modal-content border-0 shadow"
          style={{
            height: "100%",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "14px",
          }}
        >
          {/* Header */}
          <div
            className="modal-header"
            style={{
              flexShrink: 0,
            }}
          >
            <div>
              <h5 id="add-memory-title" className="modal-title fw-bold">
                Add Memory
              </h5>

              <small className="text-secondary">
                Capture a moment from your life.
              </small>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
              minHeight: 0,
            }}
          >
            {/* Scrollable Body */}
            <div
              className="modal-body"
              style={{
                flex: "1 1 auto",
                minHeight: 0,
                overflowY: "auto",
                overflowX: "hidden",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label htmlFor="memoryTitle" className="form-label">
                  Title *
                </label>

                <input
                  id="memoryTitle"
                  name="title"
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. My First Internship"
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="memoryDate" className="form-label">
                    Date *
                  </label>

                  <input
                    id="memoryDate"
                    name="date"
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="memoryCategory" className="form-label">
                    Category
                  </label>

                  <select
                    id="memoryCategory"
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option>Personal</option>
                    <option>Education</option>
                    <option>Career</option>
                    <option>Travel</option>
                    <option>College</option>
                    <option>Projects</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="memoryLocation" className="form-label">
                    Location
                  </label>

                  <input
                    id="memoryLocation"
                    name="location"
                    type="text"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="memoryImportance" className="form-label">
                    Importance
                  </label>

                  <select
                    id="memoryImportance"
                    name="importance"
                    className="form-select"
                    value={formData.importance}
                    onChange={handleChange}
                  >
                    <option value="Normal">Normal</option>

                    <option value="Major">Major</option>

                    <option value="Special">Special</option>
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="memoryDescription" className="form-label">
                    Description
                  </label>

                  <textarea
                    id="memoryDescription"
                    name="description"
                    rows="4"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell the story in as much detail as you want..."
                  ></textarea>

                  <div className="form-text">
                    Description and other details are optional.
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Media</label>

                  <FileUploader
                    multiple={true}
                    onFilesChange={(files) => {
                      setFormData((previous) => ({
                        ...previous,
                        media: files,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="modal-footer"
              style={{
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-dark">
                <i className="bi bi-check-lg me-2"></i>
                Save Memory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMemoryModal;

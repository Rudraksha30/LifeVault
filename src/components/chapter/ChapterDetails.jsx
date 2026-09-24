function ChapterDetails({
  chapter,
  memories,
  onClose,
}) {
  if (!chapter) {
    return null;
  }

  const formatDate = (date) => {
    if (!date) {
      return "Present";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className="lifevault-modal-backdrop"
      role="dialog"
      aria-modal="true"
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
              <h5 className="modal-title fw-bold">
                {chapter.icon} {chapter.title}
              </h5>

              <small className="text-secondary">
                {formatDate(chapter.startDate)}
                {" — "}
                {formatDate(chapter.endDate)}
              </small>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="lifevault-modal-body">

            {chapter.description && (
              <p className="text-secondary mb-4">
                {chapter.description}
              </p>
            )}

            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="chapter-detail-stat">
                  <strong>{memories.length}</strong>
                  <span>Memories</span>
                </div>
              </div>

              <div className="col-4">
                <div className="chapter-detail-stat">
                  <strong>0</strong>
                  <span>Achievements</span>
                </div>
              </div>

              <div className="col-4">
                <div className="chapter-detail-stat">
                  <strong>0</strong>
                  <span>Goals</span>
                </div>
              </div>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">
                Memories in this Chapter
              </h6>

              <button
                type="button"
                className="btn btn-sm btn-dark"
              >
                <i className="bi bi-plus-lg me-1"></i>
                Add Memory
              </button>
            </div>

            {memories.length > 0 ? (
              <div className="d-flex flex-column gap-2">
                {memories.map((memory) => (
                  <div
                    key={memory.id}
                    className="chapter-memory-item"
                  >
                    <div>
                      <h6 className="fw-semibold mb-1">
                        {memory.title}
                      </h6>

                      <small className="text-secondary">
                        {formatDate(memory.date)}
                      </small>
                    </div>

                    <i className="bi bi-chevron-right text-secondary"></i>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <i className="bi bi-journal-x fs-2 text-secondary"></i>

                <p className="text-secondary mt-2 mb-0">
                  No memories have been added to this
                  chapter yet.
                </p>
              </div>
            )}

          </div>

          <div className="modal-footer lifevault-modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Close
            </button>

            <button
              type="button"
              className="btn btn-outline-dark"
            >
              <i className="bi bi-pencil me-2"></i>
              Edit Chapter
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChapterDetails;
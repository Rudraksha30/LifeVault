function ChapterCard({
  chapter,
  memoryCount,
  achievementCount,
  goalCount,
  onOpen,
}) {
  const formatDate = (date) => {
    if (!date) {
      return "Present";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="card chapter-card border-0 shadow-sm h-100">

        {chapter.coverImage ? (
          <img
            src={chapter.coverImage}
            alt={chapter.title}
            className="chapter-cover"
          />
        ) : (
          <div className="chapter-cover-placeholder">
            <span>{chapter.icon}</span>
          </div>
        )}

        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <div>
              <h3 className="h5 fw-bold mb-2">
                {chapter.icon} {chapter.title}
              </h3>

              <p className="text-secondary small mb-3">
                {formatDate(chapter.startDate)}
                {" — "}
                {formatDate(chapter.endDate)}
              </p>
            </div>

            <button
              type="button"
              className="btn btn-sm btn-light"
              title="Chapter options"
            >
              <i className="bi bi-three-dots"></i>
            </button>
          </div>

          <p className="text-secondary mb-4 chapter-description">
            {chapter.description ||
              "No description added yet."}
          </p>

          <div className="row g-2 mb-4">
            <div className="col-4">
              <div className="chapter-stat">
                <strong>{memoryCount}</strong>
                <span>Memories</span>
              </div>
            </div>

            <div className="col-4">
              <div className="chapter-stat">
                <strong>{achievementCount}</strong>
                <span>Achievements</span>
              </div>
            </div>

            <div className="col-4">
              <div className="chapter-stat">
                <strong>{goalCount}</strong>
                <span>Goals</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={() => onOpen(chapter)}
          >
            Open Chapter
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChapterCard;
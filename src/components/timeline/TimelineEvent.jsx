function TimelineEvent({ memory, onView }) {
  const formattedDate = new Date(
    memory.date
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hasImages = memory.media.some(
    (file) => file.type === "image"
  );

  const hasVideos = memory.media.some(
    (file) => file.type === "video"
  );

  const hasDocuments = memory.media.some(
    (file) => file.type === "document"
  );

  return (
    <div className="timeline-event">
      <div className="timeline-dot"></div>

      <div className="timeline-event-card card border-0 shadow-sm">
        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
                <h3 className="h5 fw-bold mb-0">
                  {memory.title}
                </h3>

                {memory.importance !== "Normal" && (
                  <span className="badge text-bg-warning">
                    {memory.importance}
                  </span>
                )}
              </div>

              <div className="d-flex flex-wrap gap-2 text-secondary small">
                <span>
                  <i className="bi bi-calendar3 me-1"></i>
                  {formattedDate}
                </span>

                {memory.location && (
                  <span>
                    <i className="bi bi-geo-alt me-1"></i>
                    {memory.location}
                  </span>
                )}

                <span>
                  <i className="bi bi-tag me-1"></i>
                  {memory.category}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={() => onView(memory)}
            >
              <i className="bi bi-three-dots"></i>
            </button>
          </div>

          <p className="text-secondary mt-3 mb-3">
            {memory.description}
          </p>

          {memory.media.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {hasImages && (
                <span className="badge rounded-pill text-bg-light">
                  <i className="bi bi-image me-1"></i>
                  Images
                </span>
              )}

              {hasVideos && (
                <span className="badge rounded-pill text-bg-light">
                  <i className="bi bi-camera-video me-1"></i>
                  Videos
                </span>
              )}

              {hasDocuments && (
                <span className="badge rounded-pill text-bg-light">
                  <i className="bi bi-file-earmark-text me-1"></i>
                  Documents
                </span>
              )}
            </div>
          )}

          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={() => onView(memory)}
          >
            View Memory
            <i className="bi bi-arrow-right ms-2"></i>
          </button>

        </div>
      </div>
    </div>
  );
}

export default TimelineEvent;
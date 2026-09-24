function DocumentCard({ document, onView, onDelete }) {
  const icons = {
    image: "bi-image",
    video: "bi-camera-video",
    pdf: "bi-file-earmark-pdf",
    document: "bi-file-earmark-text",
  };

  const icon = icons[document.type] || "bi-file-earmark";

  const formattedDate = new Date(document.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  function handleDelete() {
    if (!onDelete) return;

    const confirmed = window.confirm(
      `Move "${document.name}" to the Recycle Bin?`,
    );

    if (confirmed) {
      onDelete(document.id);
    }
  }

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="card document-card border-0 shadow-sm h-100">
        <div className="document-preview">
          {document.type === "image" && document.url ? (
            <img
              src={document.url}
              alt={document.name}
              className="document-image-preview"
            />
          ) : document.type === "video" && document.url ? (
            <video
              src={document.url}
              className="document-video-preview"
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <i className={`bi ${icon}`}></i>
          )}
        </div>

        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <div className="flex-grow-1">
              <h3 className="h6 fw-bold document-name">{document.name}</h3>

              <small className="text-secondary">{document.folder}</small>
            </div>

            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={handleDelete}
              title="Move to Recycle Bin"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <small className="text-secondary">
              {Number(document.size || 0).toFixed(2)} MB
            </small>

            <small className="text-secondary">{formattedDate}</small>
          </div>

          <button
            type="button"
            className="btn btn-dark btn-sm w-100 mt-4"
            onClick={() => onView(document)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentCard;

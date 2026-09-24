import { useEffect } from "react";

import "../../styles/modal.css";

function MemoryDetailsModal({ memory, onClose, onMoveToBin }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!memory) {
    return null;
  }

  const formattedDate = new Date(memory.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // --------------------------------------------------
  // FILE HELPERS
  // --------------------------------------------------

  function getFileName(file) {
    return file?.file?.name || file?.name || "Unnamed file";
  }

  function getFileSize(file) {
    if (file?.file?.size !== undefined) {
      return (file.file.size / (1024 * 1024)).toFixed(2);
    }

    if (file?.size !== undefined) {
      return Number(file.size).toFixed(2);
    }

    return "0.00";
  }

  function getFileType(file) {
    return file?.type || "document";
  }

  function getFileUrl(file) {
    if (file?.previewUrl) {
      return file.previewUrl;
    }

    if (file?.url) {
      return file.url;
    }

    if (file?.file) {
      try {
        return URL.createObjectURL(file.file);
      } catch (error) {
        console.error("Unable to create file preview:", error);
      }
    }

    return null;
  }

  // --------------------------------------------------
  // RENDER FILE
  // --------------------------------------------------

  function renderFile(file) {
    const type = getFileType(file);
    const fileName = getFileName(file);
    const fileSize = getFileSize(file);
    const fileUrl = getFileUrl(file);

    // IMAGE

    if (type === "image" && fileUrl) {
      return (
        <div className="memory-media-item">
          <div className="memory-media-preview">
            <img
              src={fileUrl}
              alt={fileName}
              className="memory-image-preview"
            />
          </div>

          <div className="memory-media-info">
            <div>
              <p className="fw-semibold mb-1 text-break">{fileName}</p>

              <small className="text-secondary">Image • {fileSize} MB</small>
            </div>
          </div>
        </div>
      );
    }

    // VIDEO

    if (type === "video" && fileUrl) {
      return (
        <div className="memory-media-item">
          <div className="memory-video-wrapper">
            <video controls preload="metadata" className="memory-video-preview">
              <source src={fileUrl} />
              Your browser does not support video playback.
            </video>
          </div>

          <div className="memory-media-info">
            <div>
              <p className="fw-semibold mb-1 text-break">{fileName}</p>

              <small className="text-secondary">Video • {fileSize} MB</small>
            </div>
          </div>
        </div>
      );
    }

    // DOCUMENT / PDF

    const fileIcon =
      type === "pdf" ? "bi-file-earmark-pdf" : "bi-file-earmark-text";

    return (
      <div className="memory-document-item">
        <div className="memory-document-icon">
          <i className={`bi ${fileIcon}`}></i>
        </div>

        <div className="flex-grow-1 min-width-0">
          <p className="fw-semibold mb-1 text-break">{fileName}</p>

          <small className="text-secondary">
            {type === "pdf" ? "PDF" : "Document"} • {fileSize} MB
          </small>
        </div>

        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-outline-dark"
          >
            <i className="bi bi-box-arrow-up-right me-1"></i>
            Open
          </a>
        )}
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div
      className="lifevault-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-details-title"
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
              <h5 id="memory-details-title" className="modal-title fw-bold">
                {memory.title}
              </h5>

              <small className="text-secondary">{formattedDate}</small>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* BODY */}

          <div className="lifevault-modal-body">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge text-bg-light">{memory.category}</span>

              {memory.location && (
                <span className="badge text-bg-light">
                  <i className="bi bi-geo-alt me-1"></i>
                  {memory.location}
                </span>
              )}

              {memory.importance !== "Normal" && (
                <span className="badge text-bg-warning">
                  {memory.importance}
                </span>
              )}
            </div>

            {memory.description && (
              <p className="text-secondary mb-4">{memory.description}</p>
            )}

            <hr />

            {/* ATTACHED FILES */}

            <h6 className="fw-bold mb-3">Attached Files</h6>

            {memory.media && memory.media.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {memory.media.map((file, index) => (
                  <div
                    key={
                      file.id || file.fileId || `${getFileName(file)}-${index}`
                    }
                  >
                    {renderFile(file)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary mb-0">
                No files attached to this memory.
              </p>
            )}
          </div>

          {/* FOOTER */}

          <div className="modal-footer lifevault-modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Close
            </button>

            <button type="button" className="btn btn-outline-dark">
              <i className="bi bi-pencil me-2"></i>
              Edit Memory
            </button>

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => onMoveToBin?.(memory)}
            >
              <i className="bi bi-trash me-2"></i>
              Move to Bin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryDetailsModal;

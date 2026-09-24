import { useEffect } from "react";

function DocumentDetails({ document: fileDocument, onClose }) {
  useEffect(() => {
    const previousOverflow = globalThis.document.body.style.overflow;

    globalThis.document.body.style.overflow = "hidden";

    return () => {
      globalThis.document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!fileDocument) {
    return null;
  }

  const formattedDate = new Date(fileDocument.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  const fileUrl = fileDocument.url || null;

  return (
    <div
      className="lifevault-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-details-title"
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
              <h5 id="document-details-title" className="modal-title fw-bold">
                {fileDocument.name}
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
            <div className="document-detail-preview">
              {/* IMAGE */}
              {fileDocument.type === "image" && fileUrl && (
                <img src={fileUrl} alt={fileDocument.name} />
              )}

              {/* VIDEO */}
              {fileDocument.type === "video" && fileUrl && (
                <video
                  src={fileUrl}
                  controls
                  preload="metadata"
                  className="document-detail-video"
                />
              )}

              {/* PDF */}
              {fileDocument.type === "pdf" && fileUrl && (
                <div className="document-pdf-preview">
                  <i className="bi bi-file-earmark-pdf fs-1"></i>

                  <h6 className="fw-semibold mt-3">{fileDocument.name}</h6>

                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-dark mt-2"
                  >
                    <i className="bi bi-box-arrow-up-right me-2"></i>
                    Open PDF Preview
                  </a>
                </div>
              )}

              {/* OTHER DOCUMENTS */}
              {fileDocument.type !== "image" &&
                fileDocument.type !== "video" &&
                fileDocument.type !== "pdf" && (
                  <div className="document-pdf-preview">
                    <i className="bi bi-file-earmark fs-1"></i>

                    <h6 className="fw-semibold mt-3">{fileDocument.name}</h6>

                    <p className="text-secondary mb-0">
                      Preview is not available for this file type.
                    </p>
                  </div>
                )}
            </div>

            {/* DETAILS */}
            <div className="mt-4">
              <div className="document-detail-row">
                <span>File Type</span>

                <strong>{fileDocument.type.toUpperCase()}</strong>
              </div>

              <div className="document-detail-row">
                <span>Size</span>

                <strong>{Number(fileDocument.size || 0).toFixed(2)} MB</strong>
              </div>

              <div className="document-detail-row">
                <span>Folder</span>

                <strong>{fileDocument.folder}</strong>
              </div>

              <div className="document-detail-row">
                <span>Added</span>

                <strong>{formattedDate}</strong>
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
              Close
            </button>

            <button type="button" className="btn btn-outline-dark">
              <i className="bi bi-pencil me-2"></i>
              Rename
            </button>

            <button type="button" className="btn btn-outline-danger">
              <i className="bi bi-trash me-2"></i>
              Move to Bin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentDetails;

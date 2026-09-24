import { useEffect } from "react";

function AchievementDetails({ achievement, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!achievement) {
    return null;
  }

  const formattedDate = new Date(achievement.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const proof = achievement.proofFile;

  const proofName = proof?.file?.name || proof?.name || "Proof file";

  const proofType = proof?.type || "document";

  const proofSize = proof?.file?.size
    ? (proof.file.size / (1024 * 1024)).toFixed(2)
    : Number(proof?.size || 0).toFixed(2);

  const proofUrl = proof?.previewUrl || proof?.url || null;

  return (
    <div
      className="lifevault-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-details-title"
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
              <h5
                id="achievement-details-title"
                className="modal-title fw-bold"
              >
                🏆 {achievement.title}
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
            <div className="d-flex flex-wrap gap-2 mb-4">
              <span className="badge text-bg-light">
                {achievement.category}
              </span>

              {achievement.importance === "Major" && (
                <span className="badge text-bg-warning">Major Achievement</span>
              )}

              {achievement.featured && (
                <span className="badge text-bg-dark">
                  <i className="bi bi-star-fill me-1"></i>
                  Featured
                </span>
              )}
            </div>

            <div className="mb-4">
              <h6 className="fw-bold">Description</h6>

              <p className="text-secondary mb-0">
                {achievement.description || "No description added."}
              </p>
            </div>

            {achievement.issuer && (
              <div className="mb-4">
                <h6 className="fw-bold">Issued By</h6>

                <p className="text-secondary mb-0">{achievement.issuer}</p>
              </div>
            )}

            <hr />

            <h6 className="fw-bold mb-3">Proof</h6>

            {proof ? (
              <div>
                {proofType === "image" && proofUrl && (
                  <div className="achievement-proof-preview">
                    <img src={proofUrl} alt={proofName} />
                  </div>
                )}

                {proofType === "video" && proofUrl && (
                  <div className="achievement-proof-preview">
                    <video
                      src={proofUrl}
                      controls
                      preload="metadata"
                      className="achievement-proof-video"
                    />
                  </div>
                )}

                {proofType === "pdf" && proofUrl && (
                  <div className="achievement-pdf-preview">
                    <i className="bi bi-file-earmark-pdf fs-1"></i>

                    <h6 className="fw-semibold mt-3">{proofName}</h6>

                    <a
                      href={proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-dark mt-2"
                    >
                      <i className="bi bi-box-arrow-up-right me-2"></i>
                      Open PDF Preview
                    </a>
                  </div>
                )}

                <div className="achievement-proof-info mt-3">
                  <div>
                    <p className="fw-semibold mb-1 text-break">{proofName}</p>

                    <small className="text-secondary">
                      {proofType.toUpperCase()} • {proofSize} MB
                    </small>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-secondary">
                <i className="bi bi-file-earmark-x me-2"></i>
                No proof attached.
              </div>
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
              Edit Achievement
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

export default AchievementDetails;

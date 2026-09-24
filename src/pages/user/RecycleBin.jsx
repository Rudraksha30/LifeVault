import { useState } from "react";
import { useStorage } from "../../context/StorageContext";

import "../../styles/recycleBin.css";

function RecycleBin() {
  const {
    recycleBinFiles,
    restoreFile,
    permanentlyDelete,
    clearRecycleBin,
  } = useStorage();

  const [selectedFile, setSelectedFile] = useState(null);

  function formatDeletedDate(date) {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatFileSize(size) {
    return `${Number(size || 0).toFixed(2)} MB`;
  }

  function handleRestore(file) {
    const confirmed = window.confirm(
      `Restore "${file.name}" to your Documents?`,
    );

    if (!confirmed) return;

    restoreFile(file.id);

    if (selectedFile?.id === file.id) {
      setSelectedFile(null);
    }
  }

  function handlePermanentDelete(file) {
    const confirmed = window.confirm(
      `Permanently delete "${file.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    permanentlyDelete(file.id);

    if (selectedFile?.id === file.id) {
      setSelectedFile(null);
    }
  }

  function handleEmptyBin() {
    if (recycleBinFiles.length === 0) return;

    const confirmed = window.confirm(
      "Empty the Recycle Bin? All deleted files will be permanently removed and cannot be restored.",
    );

    if (!confirmed) return;

    clearRecycleBin();
    setSelectedFile(null);
  }

  const totalRecycleBinSize = recycleBinFiles.reduce(
    (total, file) => total + Number(file.size || 0),
    0,
  );

  return (
    <div className="container-fluid px-0">
      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-secondary small mb-1">
            Recently deleted files
          </p>

          <h2 className="fw-bold mb-1">
            Recycle Bin
          </h2>

          <p className="text-secondary mb-0">
            Restore files or permanently remove them from your vault.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleEmptyBin}
          disabled={recycleBinFiles.length === 0}
        >
          <i className="bi bi-trash3 me-2"></i>
          Empty Recycle Bin
        </button>
      </div>

      {/* INFO */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row g-4 align-items-center">
            <div className="col-6 col-md-4">
              <small className="text-secondary">
                Deleted Files
              </small>

              <h4 className="fw-bold mb-0">
                {recycleBinFiles.length}
              </h4>
            </div>

            <div className="col-6 col-md-4">
              <small className="text-secondary">
                Storage Used
              </small>

              <h4 className="fw-bold mb-0">
                {formatFileSize(totalRecycleBinSize)}
              </h4>
            </div>

            <div className="col-12 col-md-4">
              <small className="text-secondary">
                Storage Status
              </small>

              <p className="mb-0 text-warning fw-semibold">
                <i className="bi bi-exclamation-circle me-1"></i>
                Deleted files still use storage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FILES */}
      {recycleBinFiles.length > 0 ? (
        <div className="row g-4">
          {recycleBinFiles.map((file) => (
            <div
              className="col-12 col-md-6 col-xl-4"
              key={file.id}
            >
              <div className="card recycle-bin-card border-0 shadow-sm h-100">
                {/* PREVIEW */}
                <div className="recycle-bin-preview">
                  {file.type === "image" && file.url ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="recycle-bin-image-preview"
                    />
                  ) : file.type === "video" && file.url ? (
                    <video
                      src={file.url}
                      className="recycle-bin-video-preview"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <i className="bi bi-trash3 recycle-bin-icon"></i>
                  )}
                </div>

                {/* DETAILS */}
                <div className="card-body p-4">
                  <h3 className="h6 fw-bold recycle-bin-file-name">
                    {file.name}
                  </h3>

                  <div className="small text-secondary mb-3">
                    <div>
                      <i className="bi bi-folder me-2"></i>
                      {file.folder || "General"}
                    </div>

                    <div className="mt-1">
                      <i className="bi bi-calendar3 me-2"></i>
                      Deleted{" "}
                      {formatDeletedDate(file.deletedAt)}
                    </div>

                    <div className="mt-1">
                      <i className="bi bi-hdd me-2"></i>
                      {formatFileSize(file.size)}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-dark btn-sm flex-grow-1"
                      onClick={() => handleRestore(file)}
                    >
                      <i className="bi bi-arrow-counterclockwise me-1"></i>
                      Restore
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      title="Permanently Delete"
                      onClick={() =>
                        handlePermanentDelete(file)
                      }
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-light btn-sm w-100 mt-2"
                    onClick={() => setSelectedFile(file)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="recycle-bin-empty text-center p-5">
          <i className="bi bi-trash3 fs-1 text-secondary"></i>

          <h3 className="h5 fw-bold mt-3">
            Recycle Bin is Empty
          </h3>

          <p className="text-secondary mb-0">
            Deleted files will appear here.
          </p>
        </div>
      )}

      {/* DETAILS */}
      {selectedFile && (
        <div className="lifevault-modal-backdrop">
          <div
            className="lifevault-modal-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="lifevault-modal-content shadow">
              <div className="modal-header lifevault-modal-header">
                <div>
                  <h5 className="modal-title fw-bold">
                    Deleted File
                  </h5>

                  <small className="text-secondary">
                    {selectedFile.name}
                  </small>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedFile(null)}
                ></button>
              </div>

              <div className="lifevault-modal-body">
                {selectedFile.type === "image" &&
                selectedFile.url ? (
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.name}
                    className="img-fluid rounded"
                  />
                ) : selectedFile.type === "video" &&
                  selectedFile.url ? (
                  <video
                    src={selectedFile.url}
                    controls
                    className="w-100 rounded"
                  />
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-file-earmark fs-1 text-secondary"></i>

                    <p className="mt-3 mb-0">
                      Preview is not available for this file type.
                    </p>
                  </div>
                )}

                <div className="mt-4">
                  <p className="mb-2">
                    <strong>Name:</strong>{" "}
                    {selectedFile.name}
                  </p>

                  <p className="mb-2">
                    <strong>Folder:</strong>{" "}
                    {selectedFile.folder || "General"}
                  </p>

                  <p className="mb-2">
                    <strong>Size:</strong>{" "}
                    {formatFileSize(selectedFile.size)}
                  </p>

                  <p className="mb-0">
                    <strong>Deleted:</strong>{" "}
                    {formatDeletedDate(selectedFile.deletedAt)}
                  </p>
                </div>
              </div>

              <div className="modal-footer lifevault-modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setSelectedFile(null)}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() =>
                    handleRestore(selectedFile)
                  }
                >
                  <i className="bi bi-arrow-counterclockwise me-2"></i>
                  Restore
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() =>
                    handlePermanentDelete(selectedFile)
                  }
                >
                  <i className="bi bi-trash3 me-2"></i>
                  Permanently Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecycleBin;
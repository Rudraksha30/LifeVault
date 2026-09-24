import { useEffect, useState } from "react";
import FileUploader from "../common/FileUploader";

function UploadDocumentModal({ onClose, onSave, availableStorage }) {
  const [folder, setFolder] = useState("General");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // BODY SCROLL LOCK
  // --------------------------------------------------

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // --------------------------------------------------
  // SELECTED FILE STORAGE
  // --------------------------------------------------

  const selectedSizeMB = selectedFiles.reduce(
    (total, item) => total + Number(item.file?.size || 0) / (1024 * 1024),
    0,
  );

  const selectedSizeGB = selectedSizeMB / 1024;

  const remainingStorage = Math.max(
    Number(availableStorage || 0) - selectedSizeGB,
    0,
  );

  const exceedsStorage = selectedSizeGB > Number(availableStorage || 0);

  // --------------------------------------------------
  // FILE SELECTION
  // --------------------------------------------------

  function handleFilesChange(files) {
    setSelectedFiles(files);
    setError("");

    const totalSizeMB = files.reduce(
      (total, item) => total + Number(item.file?.size || 0) / (1024 * 1024),
      0,
    );

    const totalSizeGB = totalSizeMB / 1024;

    if (totalSizeGB > Number(availableStorage || 0)) {
      setError(
        `Not enough storage. You have ${Number(availableStorage || 0).toFixed(
          2,
        )} GB available, but the selected files require ${totalSizeGB.toFixed(
          2,
        )} GB.`,
      );
    }
  }

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedFiles.length === 0) {
      setError("Please select at least one file.");
      return;
    }

    if (exceedsStorage) {
      setError(
        `Not enough storage. You have ${Number(availableStorage || 0).toFixed(
          2,
        )} GB available, but the selected files require ${selectedSizeGB.toFixed(
          2,
        )} GB.`,
      );

      return;
    }

    setError("");

    const result = onSave({
      files: selectedFiles,
      folder,
    });

    // StorageContext.addFiles() returns a result.
    // If the central storage validation rejects the upload,
    // keep this modal open and show the returned message.
    if (result && result.success === false) {
      setError(result.message);
      return;
    }
  }

  return (
    <div
      className="lifevault-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-document-title"
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
              <h5 id="upload-document-title" className="modal-title fw-bold">
                Upload Files
              </h5>

              <small className="text-secondary">
                Add files to your LifeVault.
              </small>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column flex-grow-1"
          >
            {/* SCROLLABLE BODY */}
            <div className="lifevault-modal-body">
              {/* ERROR */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}

              {/* FILE PICKER */}
              <div>
                <label className="form-label">Files</label>

                <FileUploader
                  multiple={true}
                  availableStorage={availableStorage}
                  onFilesChange={handleFilesChange}
                />
              </div>

              {/* FOLDER */}
              <div className="mt-4">
                <label htmlFor="documentFolder" className="form-label">
                  Folder
                </label>

                <select
                  id="documentFolder"
                  className="form-select"
                  value={folder}
                  onChange={(event) => setFolder(event.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Education">Education</option>
                  <option value="Certificates">Certificates</option>
                  <option value="Career">Career</option>
                  <option value="Travel">Travel</option>
                  <option value="Projects">Projects</option>
                </select>
              </div>

              {/* STORAGE */}
              <div className="alert alert-light border mt-4 mb-0">
                <div className="d-flex justify-content-between">
                  <span>Available storage</span>

                  <strong>{Number(availableStorage || 0).toFixed(2)} GB</strong>
                </div>

                {selectedFiles.length > 0 && (
                  <>
                    <hr />

                    <div className="small">
                      <div className="d-flex justify-content-between">
                        <span className="text-secondary">Selected files</span>

                        <span className="fw-semibold">
                          {selectedSizeGB.toFixed(2)} GB
                        </span>
                      </div>

                      <div className="d-flex justify-content-between mt-1">
                        <span className="text-secondary">
                          Remaining after upload
                        </span>

                        <span
                          className={
                            exceedsStorage
                              ? "text-danger fw-semibold"
                              : "fw-semibold"
                          }
                        >
                          {remainingStorage.toFixed(2)} GB
                        </span>
                      </div>
                    </div>

                    {exceedsStorage && (
                      <div className="text-danger small mt-3">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        The selected files exceed your available storage.
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer lifevault-modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-dark"
                disabled={selectedFiles.length === 0 || exceedsStorage}
              >
                <i className="bi bi-cloud-upload me-2"></i>
                Add Files
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadDocumentModal;

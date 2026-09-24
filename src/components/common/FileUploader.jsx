import { useState } from "react";

import { getDocumentType } from "../../services/documentService";

function FileUploader({
  onFilesChange,
  availableStorage = Infinity,
  multiple = true,
  accept = `
        image/*,
        video/*,
        application/pdf,
        .doc,.docx,
        .xls,.xlsx,
        .ppt,.pptx,
        .txt
    `,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [error, setError] = useState("");

  function handleFileChange(event) {
    const newFiles = Array.from(event.target.files || []);

    setError("");

    const validFiles = [];

    for (const file of newFiles) {
      const type = getDocumentType(file);

      const isSupported =
        type === "image" ||
        type === "video" ||
        type === "pdf" ||
        type === "document";

      if (!isSupported) {
        setError(`${file.name} is not a supported file type.`);

        continue;
      }

      let previewUrl = null;

      if (type === "image" || type === "video" || type === "pdf") {
        previewUrl = URL.createObjectURL(file);
      }

      validFiles.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        type,
        previewUrl,
      });
    }

    if (validFiles.length === 0) {
      event.target.value = "";
      return;
    }

    const combinedFiles = multiple
      ? [...selectedFiles, ...validFiles]
      : [validFiles[0]];

    const totalSizeMB = combinedFiles.reduce(
      (total, item) => total + item.file.size / (1024 * 1024),
      0,
    );

    const availableStorageMB = availableStorage * 1024;

    if (totalSizeMB > availableStorageMB) {
      validFiles.forEach((item) => {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });

      setError("The selected files exceed your available storage.");

      event.target.value = "";
      return;
    }

    setSelectedFiles(combinedFiles);

    onFilesChange?.(combinedFiles);

    event.target.value = "";
  }

  function getTotalSizeMB() {
    return selectedFiles.reduce(
      (total, item) => total + item.file.size / (1024 * 1024),
      0,
    );
  }

  function getFileIcon(type) {
    if (type === "video") {
      return "bi-camera-video";
    }

    if (type === "pdf") {
      return "bi-file-earmark-pdf";
    }

    return "bi-file-earmark-text";
  }

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      <label className="document-upload-area">
        <i className="bi bi-cloud-arrow-up fs-1"></i>

        <h6 className="fw-bold mt-3">Choose files from your computer</h6>

        <p className="text-secondary mb-3">
          Images, videos, PDFs and documents are supported.
        </p>

        <span className="btn btn-outline-dark">Browse Files</span>

        <input
          type="file"
          className="d-none"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
        />
      </label>

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">Selected Files</h6>

            <small className="text-secondary">
              {getTotalSizeMB().toFixed(2)} MB
            </small>
          </div>

          <div className="d-flex flex-column gap-2">
            {selectedFiles.map((item) => (
              <div key={item.id} className="selected-file">
                <div className="d-flex align-items-center gap-3">
                  {item.type === "image" && item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt={item.file.name}
                      className="selected-file-preview"
                    />
                  ) : (
                    <div className="selected-file-icon">
                      <i className={`bi ${getFileIcon(item.type)}`}></i>
                    </div>
                  )}

                  <div className="flex-grow-1">
                    <p className="fw-semibold mb-1 text-break">
                      {item.file.name}
                    </p>

                    <small className="text-secondary">
                      {(item.file.size / (1024 * 1024)).toFixed(2)}{" "}MB
                    </small>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFile(item.id)}
                    aria-label={`Remove ${item.file.name}`}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploader;

function StorageBreakdown({ documents, recycledSize = 0 }) {
  const getSize = (document) => Number(document.size || 0);

  const images = documents
    .filter((document) => document.type === "image")
    .reduce((total, document) => total + getSize(document), 0);

  const videos = documents
    .filter((document) => document.type === "video")
    .reduce((total, document) => total + getSize(document), 0);

  const pdfs = documents
    .filter((document) => document.type === "pdf")
    .reduce((total, document) => total + getSize(document), 0);

  const other = documents
    .filter(
      (document) =>
        document.type !== "image" &&
        document.type !== "video" &&
        document.type !== "pdf",
    )
    .reduce((total, document) => total + getSize(document), 0);

  const items = [
    {
      label: "Images",
      size: images,
      icon: "bi-image",
    },
    {
      label: "Videos",
      size: videos,
      icon: "bi-camera-video",
    },
    {
      label: "PDFs",
      size: pdfs,
      icon: "bi-file-earmark-pdf",
    },
    {
      label: "Other Files",
      size: other,
      icon: "bi-file-earmark",
    },
    {
      label: "Recycle Bin",
      size: Number(recycledSize || 0),
      icon: "bi-trash",
    },
  ];

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <p className="text-secondary small mb-1">Storage Usage</p>

        <h3 className="h5 fw-bold mb-4">Where your storage is being used</h3>

        <div className="d-flex flex-column gap-3">
          {items.map((item) => (
            <div key={item.label} className="storage-breakdown-item">
              <div className="d-flex align-items-center gap-3">
                <div className="storage-type-icon">
                  <i className={`bi ${item.icon}`}></i>
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">{item.label}</span>

                    <span className="text-secondary">
                      {Number(item.size || 0).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StorageBreakdown;

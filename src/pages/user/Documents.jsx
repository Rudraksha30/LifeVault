import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import { searchDocuments } from "../../services/documentService";

import DocumentFilters from "../../components/document/DocumentFilters";
import DocumentCard from "../../components/document/DocumentCard";
import UploadDocumentModal from "../../components/document/UploadDocumentModal";
import DocumentDetails from "../../components/document/DocumentDetails";

import "../../styles/documents.css";

function Documents() {
  const { user } = useAuth();

  const { activeFiles, files, addFiles, deleteFile, storage } = useStorage();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [folderFilter, setFolderFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // --------------------------------------------------
  // STORAGE
  // --------------------------------------------------

  // Storage usage includes active files AND recycle bin files.
  // Deleted files still consume storage until permanently deleted.
  const totalStorageUsed = files.reduce(
    (total, file) => total + Number(file.size || 0),
    0,
  );

  // Size is stored in MB, so convert MB -> GB.
  const usedStorageGB = totalStorageUsed / 1024;
  const totalStorage = storage.totalGB;
  const availableStorage = Math.max(totalStorage - usedStorageGB, 0);

  // --------------------------------------------------
  // FILTER + SORT
  // --------------------------------------------------

  const filteredDocuments = useMemo(() => {
    let result = searchDocuments(activeFiles, searchTerm);

    if (typeFilter !== "all") {
      result = result.filter((document) => document.type === typeFilter);
    }

    if (folderFilter !== "all") {
      result = result.filter((document) => document.folder === folderFilter);
    }

    result = [...result].sort((a, b) => {
      if (sortOrder === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortOrder === "size") {
        return Number(b.size || 0) - Number(a.size || 0);
      }

      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [activeFiles, searchTerm, typeFilter, folderFilter, sortOrder]);

  // --------------------------------------------------
  // UPLOAD
  // --------------------------------------------------

  function handleUpload({ files: uploadedFiles, folder }) {
    const newDocuments = uploadedFiles.map((item, index) => ({
      id: Date.now() + index + Math.random(),
      userId: user.id,
      name: item.file.name,
      type: item.type,
      // Store size in MB.
      size: item.file.size / (1024 * 1024),
      folder,
      createdAt: new Date().toISOString(),
      url: item.previewUrl || null,
    }));

    addFiles(newDocuments);
    setShowUploadModal(false);
  }

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------

  function handleDelete(documentId) {
    deleteFile(documentId);

    // Close the details modal if the deleted file
    // is currently being viewed.
    if (selectedDocument?.id === documentId) {
      setSelectedDocument(null);
    }
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="container-fluid px-0">
      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-secondary small mb-1">Your personal file vault</p>

          <h2 className="fw-bold mb-1">My Documents</h2>

          <p className="text-secondary mb-0">
            Keep your important files organized.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setShowUploadModal(true)}
        >
          <i className="bi bi-cloud-upload me-2"></i>
          Upload Files
        </button>
      </div>

      {/* STORAGE */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row align-items-center g-4">
            <div className="col-md-5">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-semibold">Storage Used</span>

                <span className="text-secondary">
                  {usedStorageGB.toFixed(2)} GB / {totalStorage} GB
                </span>
              </div>

              <div
                className="progress"
                style={{
                  height: "9px",
                }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.min(
                      (usedStorageGB / totalStorage) * 100,
                      100,
                    )}%`,
                  }}
                ></div>
              </div>

              <small className="text-secondary d-block mt-2">
                {availableStorage.toFixed(2)} GB available
              </small>
            </div>

            <div className="col-md-7">
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <small className="text-secondary">Files</small>

                  <h5 className="fw-bold mb-0">{activeFiles.length}</h5>
                </div>

                <div className="col-6 col-md-3">
                  <small className="text-secondary">Images</small>

                  <h5 className="fw-bold mb-0">
                    {
                      activeFiles.filter(
                        (document) => document.type === "image",
                      ).length
                    }
                  </h5>
                </div>

                <div className="col-6 col-md-3">
                  <small className="text-secondary">Videos</small>

                  <h5 className="fw-bold mb-0">
                    {
                      activeFiles.filter(
                        (document) => document.type === "video",
                      ).length
                    }
                  </h5>
                </div>

                <div className="col-6 col-md-3">
                  <small className="text-secondary">PDFs</small>

                  <h5 className="fw-bold mb-0">
                    {
                      activeFiles.filter((document) => document.type === "pdf")
                        .length
                    }
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <DocumentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        folderFilter={folderFilter}
        setFolderFilter={setFolderFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* FILES */}
      {filteredDocuments.length > 0 ? (
        <div className="row g-4">
          {filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onView={setSelectedDocument}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="timeline-empty text-center p-5">
          <i className="bi bi-folder2-open fs-1 text-secondary"></i>

          <h3 className="h5 fw-bold mt-3">No documents found</h3>

          <p className="text-secondary">
            Upload your first file to start building your vault.
          </p>

          <button
            type="button"
            className="btn btn-dark"
            onClick={() => setShowUploadModal(true)}
          >
            <i className="bi bi-cloud-upload me-2"></i>
            Upload Files
          </button>
        </div>
      )}

      {/* UPLOAD */}
      {showUploadModal && (
        <UploadDocumentModal
          onClose={() => setShowUploadModal(false)}
          onSave={handleUpload}
          availableStorage={availableStorage}
        />
      )}

      {/* DETAILS */}
      {selectedDocument && (
        <DocumentDetails
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}

export default Documents;

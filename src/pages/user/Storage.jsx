import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import storagePlans from "../../data/storagePlans";
import { calculateUsedStorageGB } from "../../services/storageService";
import StorageOverview from "../../components/storage/StorageOverview";
import StorageBreakdown from "../../components/storage/StorageBreakdown";
import StoragePackCard from "../../components/storage/StoragePackCard";
import StorageHistory from "../../components/storage/StorageHistory";
import StorageWarning from "../../components/storage/StorageWarning";

import "../../styles/storage.css";

function Storage() {
  const { user } = useAuth();

  const {
    storage,
    files,
    activeFiles,
    recycleBinFiles,
    purchaseStorage,
    hasPurchasedPlan,
    restoreFile,
    permanentlyDelete,
    clearRecycleBin,
  } = useStorage();

  // --------------------------------------------------
  // STORAGE CALCULATION
  // --------------------------------------------------

  // IMPORTANT:
  // We intentionally use ALL files here.
  // Files inside Recycle Bin still consume storage.
  const usedStorageGB = calculateUsedStorageGB(files);

  const recycledSizeMB = recycleBinFiles.reduce(
    (total, file) => total + Number(file.size || 0),
    0,
  );

  // --------------------------------------------------
  // RECYCLE BIN
  // --------------------------------------------------

  function formatFileSize(size) {
    return `${Number(size || 0).toFixed(2)} MB`;
  }

  function formatDeletedDate(date) {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function handleRestore(file) {
    const confirmed = window.confirm(
      `Restore "${file.name}" to your Documents?`,
    );

    if (!confirmed) return;

    restoreFile(file.id);
  }

  function handlePermanentDelete(file) {
    const confirmed = window.confirm(
      `Permanently delete "${file.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    permanentlyDelete(file.id);
  }

  function handleEmptyRecycleBin() {
    if (recycleBinFiles.length === 0) return;

    const confirmed = window.confirm(
      "Empty the Recycle Bin? All deleted files will be permanently removed and cannot be restored.",
    );

    if (!confirmed) return;

    clearRecycleBin();
  }

  return (
    <div className="container-fluid px-0">
      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-secondary small mb-1">Your personal cloud space</p>

          <h2 className="fw-bold mb-1">Storage</h2>

          <p className="text-secondary mb-0">
            Manage your LifeVault space and upgrades.
          </p>
        </div>
      </div>

      {/* STORAGE OVERVIEW */}
      <div className="mb-4">
        <StorageOverview usedGB={usedStorageGB} totalGB={storage.totalGB} />
      </div>
        <StorageWarning />

      {/* RECYCLE BIN */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <p className="text-secondary small mb-1">Deleted files</p>

              <h3 className="h5 fw-bold mb-1">
                <i className="bi bi-trash3 me-2"></i>
                Recycle Bin
              </h3>

              <p className="text-secondary small mb-0">
                Deleted files continue to use storage until permanently deleted.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleEmptyRecycleBin}
              disabled={recycleBinFiles.length === 0}
            >
              <i className="bi bi-trash3 me-2"></i>
              Empty Recycle Bin
            </button>
          </div>

          {/* RECYCLE BIN SUMMARY */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-4">
              <div className="p-3 bg-light rounded">
                <small className="text-secondary d-block">Deleted Files</small>

                <strong className="fs-5">{recycleBinFiles.length}</strong>
              </div>
            </div>

            <div className="col-6 col-md-4">
              <div className="p-3 bg-light rounded">
                <small className="text-secondary d-block">Storage Used</small>

                <strong className="fs-5">
                  {formatFileSize(recycledSizeMB)}
                </strong>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 bg-light rounded">
                <small className="text-secondary d-block">Status</small>

                <strong className="text-warning">
                  <i className="bi bi-info-circle me-1"></i>
                  Still using storage
                </strong>
              </div>
            </div>
          </div>

          {/* RECYCLE BIN FILES */}
          {recycleBinFiles.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {recycleBinFiles.map((file) => (
                <div key={file.id} className="border rounded p-3">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    {/* FILE INFO */}
                    <div className="d-flex align-items-center gap-3">
                      <div className="fs-3 text-secondary">
                        {file.type === "image" ? (
                          <i className="bi bi-image"></i>
                        ) : file.type === "video" ? (
                          <i className="bi bi-camera-video"></i>
                        ) : file.type === "pdf" ? (
                          <i className="bi bi-file-earmark-pdf"></i>
                        ) : (
                          <i className="bi bi-file-earmark"></i>
                        )}
                      </div>

                      <div>
                        <h4 className="h6 fw-bold mb-1">{file.name}</h4>

                        <div className="small text-secondary">
                          {file.folder || "General"}
                          {" • "}
                          {formatFileSize(file.size)}
                          {" • "}
                          Deleted {formatDeletedDate(file.deletedAt)}
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-dark btn-sm"
                        onClick={() => handleRestore(file)}
                      >
                        <i className="bi bi-arrow-counterclockwise me-1"></i>
                        Restore
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handlePermanentDelete(file)}
                      >
                        <i className="bi bi-trash3 me-1"></i>
                        Delete Permanently
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <i className="bi bi-trash3 fs-1 text-secondary"></i>

              <h4 className="h6 fw-bold mt-3">Recycle Bin is Empty</h4>

              <p className="text-secondary small mb-0">
                Deleted files will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* BREAKDOWN */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-5">
          <StorageBreakdown
            documents={activeFiles}
            recycledSize={recycledSizeMB}
          />
        </div>

        <div className="col-12 col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <p className="text-secondary small mb-1">Storage Rules</p>

              <h3 className="h5 fw-bold mb-3">How LifeVault Storage Works</h3>

              <div className="d-flex flex-column gap-3">
                {/* ONE-TIME PURCHASE */}
                <div className="d-flex gap-3">
                  <i className="bi bi-check-circle-fill mt-1"></i>

                  <div>
                    <strong>One-time purchases</strong>

                    <p className="text-secondary small mb-0">
                      Storage upgrades are permanent purchases, not monthly
                      subscriptions.
                    </p>
                  </div>
                </div>

                {/* RECYCLE BIN */}
                <div className="d-flex gap-3">
                  <i className="bi bi-check-circle-fill mt-1"></i>

                  <div>
                    <strong>Recycle Bin counts</strong>

                    <p className="text-secondary small mb-0">
                      Deleted files continue to use storage until permanently
                      deleted.
                    </p>
                  </div>
                </div>

                {/* MAXIMUM STORAGE */}
                <div className="d-flex gap-3">
                  <i className="bi bi-check-circle-fill mt-1"></i>

                  <div>
                    <strong>1 TB maximum</strong>

                    <p className="text-secondary small mb-0">
                      A user's total LifeVault storage can never exceed 1 TB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STORAGE PLANS */}
      <div className="mb-4">
        <div className="mb-3">
          <p className="text-secondary small mb-1">Upgrade your space</p>

          <h3 className="h5 fw-bold mb-0">Storage Packs</h3>
        </div>

        <div className="row g-4">
          {storagePlans.map((plan) => (
            <StoragePackCard
              key={plan.id}
              plan={plan}
              currentStorage={storage.totalGB}
              purchasedBefore={hasPurchasedPlan(plan.id)}
              onPurchase={purchaseStorage}
            />
          ))}
        </div>
      </div>

      {/* PURCHASE HISTORY */}
      <StorageHistory purchases={storage.purchaseHistory} />
    </div>
  );
}

export default Storage;

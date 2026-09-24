import { useState } from "react";

import "../../styles/admin.css";

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "LifeVault",
    freeStorageGB: 4,
    maxStorageGB: 1024,
    allowRegistrations: true,
    allowUserDeletion: true,
    recycleBinDays: 30,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="container-fluid px-0 admin-dashboard">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <section className="admin-page-header mb-4">
        <div>
          <p className="text-secondary small mb-1">LifeVault administration</p>

          <h2 className="fw-bold mb-1">Admin Settings</h2>

          <p className="text-secondary mb-0">
            Configure platform-wide LifeVault settings.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* SUCCESS MESSAGE */}
      {/* -------------------------------------------------- */}

      {saved && (
        <div
          className="alert alert-success d-flex align-items-center gap-2 mb-4"
          role="alert"
        >
          <i className="bi bi-check-circle"></i>

          <span>Settings have been saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* -------------------------------------------------- */}
        {/* PLATFORM SETTINGS */}
        {/* -------------------------------------------------- */}

        <section className="card admin-panel-card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="mb-4">
              <p className="text-secondary small mb-1">Platform</p>

              <h3 className="h5 fw-bold mb-1">Platform Settings</h3>

              <p className="text-secondary small mb-0">
                Configure the basic information used by LifeVault.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <label htmlFor="siteName" className="form-label fw-semibold">
                  Site Name
                </label>

                <input
                  id="siteName"
                  name="siteName"
                  type="text"
                  className="form-control"
                  value={settings.siteName}
                  onChange={handleChange}
                  maxLength="50"
                />

                <small className="text-secondary">
                  The platform name displayed throughout LifeVault.
                </small>
              </div>

              <div className="col-12 col-lg-6">
                <label
                  htmlFor="freeStorageGB"
                  className="form-label fw-semibold"
                >
                  Default Free Storage
                </label>

                <div className="input-group">
                  <input
                    id="freeStorageGB"
                    name="freeStorageGB"
                    type="number"
                    className="form-control"
                    value={settings.freeStorageGB}
                    onChange={handleChange}
                    min="1"
                    max="100"
                  />

                  <span className="input-group-text">GB</span>
                </div>

                <small className="text-secondary">
                  Storage provided to every new user.
                </small>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* STORAGE SETTINGS */}
        {/* -------------------------------------------------- */}

        <section className="card admin-panel-card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="mb-4">
              <p className="text-secondary small mb-1">Storage</p>

              <h3 className="h5 fw-bold mb-1">Storage Configuration</h3>

              <p className="text-secondary small mb-0">
                Control storage limits and recycle-bin behavior.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <label
                  htmlFor="maxStorageGB"
                  className="form-label fw-semibold"
                >
                  Maximum User Storage
                </label>

                <div className="input-group">
                  <input
                    id="maxStorageGB"
                    name="maxStorageGB"
                    type="number"
                    className="form-control"
                    value={settings.maxStorageGB}
                    onChange={handleChange}
                    min="4"
                    max="1024"
                  />

                  <span className="input-group-text">GB</span>
                </div>

                <small className="text-secondary">
                  Maximum storage one user can have. Current project limit is
                  1024 GB (1 TB).
                </small>
              </div>

              <div className="col-12 col-lg-6">
                <label
                  htmlFor="recycleBinDays"
                  className="form-label fw-semibold"
                >
                  Recycle Bin Retention
                </label>

                <div className="input-group">
                  <input
                    id="recycleBinDays"
                    name="recycleBinDays"
                    type="number"
                    className="form-control"
                    value={settings.recycleBinDays}
                    onChange={handleChange}
                    min="1"
                    max="365"
                  />

                  <span className="input-group-text">days</span>
                </div>

                <small className="text-secondary">
                  How long deleted files may remain before cleanup.
                </small>
              </div>
            </div>

            <div className="alert alert-light border mt-4 mb-0">
              <div className="d-flex align-items-start gap-3">
                <i className="bi bi-info-circle fs-5"></i>

                <div>
                  <strong>Storage rule</strong>

                  <p className="small text-secondary mb-0 mt-1">
                    Recycle Bin files continue to count toward user storage
                    until they are permanently deleted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* USER MANAGEMENT */}
        {/* -------------------------------------------------- */}

        <section className="card admin-panel-card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="mb-4">
              <p className="text-secondary small mb-1">User Management</p>

              <h3 className="h5 fw-bold mb-1">Account Controls</h3>

              <p className="text-secondary small mb-0">
                Configure how user accounts are handled.
              </p>
            </div>

            <div className="d-flex flex-column gap-4">
              <div className="d-flex justify-content-between align-items-start gap-4">
                <div>
                  <h4 className="h6 fw-semibold mb-1">
                    Allow New Registrations
                  </h4>

                  <p className="text-secondary small mb-0">
                    Allow visitors to create new LifeVault accounts.
                  </p>
                </div>

                <div className="form-check form-switch flex-shrink-0">
                  <input
                    id="allowRegistrations"
                    name="allowRegistrations"
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.allowRegistrations}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-start gap-4">
                <div>
                  <h4 className="h6 fw-semibold mb-1">
                    Allow User Account Deletion
                  </h4>

                  <p className="text-secondary small mb-0">
                    Allow users to permanently delete their LifeVault account
                    from Settings.
                  </p>
                </div>

                <div className="form-check form-switch flex-shrink-0">
                  <input
                    id="allowUserDeletion"
                    name="allowUserDeletion"
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.allowUserDeletion}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* SECURITY */}
        {/* -------------------------------------------------- */}

        <section className="card admin-panel-card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="mb-4">
              <p className="text-secondary small mb-1">Security</p>

              <h3 className="h5 fw-bold mb-1">Administration Security</h3>

              <p className="text-secondary small mb-0">
                Administrative access information.
              </p>
            </div>

            <div className="d-flex align-items-start gap-3">
              <div className="admin-storage-pack-icon">
                <i className="bi bi-shield-lock"></i>
              </div>

              <div>
                <h4 className="h6 fw-semibold mb-1">Admin-only Access</h4>

                <p className="text-secondary small mb-2">
                  Admin pages are protected by the application's role-based
                  route protection.
                </p>

                <span className="badge text-bg-success">
                  <i className="bi bi-check-circle me-1"></i>
                  ADMIN protection enabled
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* SAVE */}
        {/* -------------------------------------------------- */}

        <section className="d-flex justify-content-end pb-4">
          <button type="submit" className="btn btn-dark">
            <i className="bi bi-check-lg me-2"></i>
            Save Settings
          </button>
        </section>
      </form>
    </div>
  );
}

export default AdminSettings;
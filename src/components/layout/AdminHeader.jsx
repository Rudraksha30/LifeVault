function AdminHeader() {
  return (
    <header className="border-bottom bg-white px-4 py-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h5 mb-1">Admin Dashboard</h1>
          <p className="text-secondary mb-0">
            Manage and monitor LifeVault.
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button type="button" className="btn btn-light">
            <i className="bi bi-bell"></i>
          </button>

          <button type="button" className="btn btn-dark">
            <i className="bi bi-person-circle me-2"></i>
            Admin
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
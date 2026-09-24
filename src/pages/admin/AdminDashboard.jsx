import { Link } from "react-router-dom";
import mockUsers from "../../data/mockUsers";

import "../../styles/admin.css";

function AdminDashboard() {
  // --------------------------------------------------
  // DEMO ADMIN STATISTICS
  // --------------------------------------------------

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(
    (user) => user.status !== "inactive",
  ).length;

  // These values are temporary frontend/demo statistics.
  // Later they will come from Spring Boot + SQL.
  const totalMemories = 42;
  const totalFiles = 18;
  const storageUsed = 6.84;
  const totalStorage = 24;
  const storagePercentage =
    (storageUsed / totalStorage) * 100;

  const storagePacksSold = 27;
  const totalRevenue = 2460;

  // --------------------------------------------------
  // RECENT ACTIVITY
  // --------------------------------------------------

  const recentActivity = [
    {
      id: 1,
      icon: "bi-person-plus",
      title: "New user registered",
      description: "A new LifeVault account was created.",
      time: "10 minutes ago",
      type: "success",
    },
    {
      id: 2,
      icon: "bi-cloud-arrow-up",
      title: "Storage upgraded",
      description: "A user purchased a 10 GB Pro pack.",
      time: "32 minutes ago",
      type: "primary",
    },
    {
      id: 3,
      icon: "bi-images",
      title: "Media uploaded",
      description: "Multiple memory files were uploaded.",
      time: "1 hour ago",
      type: "info",
    },
    {
      id: 4,
      icon: "bi-credit-card",
      title: "Payment received",
      description: "A storage upgrade payment was completed.",
      time: "2 hours ago",
      type: "warning",
    },
  ];

  // --------------------------------------------------
  // STORAGE DISTRIBUTION
  // --------------------------------------------------

  const storageCategories = [
    {
      label: "Memories",
      size: "3.84 GB",
      percentage: 56,
      icon: "bi-camera",
    },
    {
      label: "Documents",
      size: "1.92 GB",
      percentage: 28,
      icon: "bi-file-earmark-text",
    },
    {
      label: "Achievements",
      size: "0.72 GB",
      percentage: 11,
      icon: "bi-trophy",
    },
    {
      label: "Other",
      size: "0.36 GB",
      percentage: 5,
      icon: "bi-folder",
    },
  ];

  return (
    <div className="container-fluid px-0 admin-dashboard">
      {/* --------------------------------------------------
          HEADER
      -------------------------------------------------- */}

      <section className="admin-page-header mb-4">
        <div>
          <p className="text-secondary small mb-1">
            LifeVault administration
          </p>

          <h2 className="fw-bold mb-1">
            Admin Dashboard
          </h2>

          <p className="text-secondary mb-0">
            Monitor users, storage, payments and platform activity.
          </p>
        </div>

        <div className="admin-header-actions">
          <Link
            to="/admin/users"
            className="btn btn-dark"
          >
            <i className="bi bi-people me-2"></i>
            Manage Users
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------
          PRIMARY STATISTICS
      -------------------------------------------------- */}

      <section className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">
                    Total Users
                  </p>

                  <h3 className="fw-bold mb-1">
                    {totalUsers}
                  </h3>

                  <small className="text-success">
                    <i className="bi bi-arrow-up me-1"></i>
                    12% this month
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-blue">
                  <i className="bi bi-people"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">
                    Active Users
                  </p>

                  <h3 className="fw-bold mb-1">
                    {activeUsers}
                  </h3>

                  <small className="text-success">
                    <i className="bi bi-check-circle me-1"></i>
                    Currently active
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-green">
                  <i className="bi bi-person-check"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">
                    Total Memories
                  </p>

                  <h3 className="fw-bold mb-1">
                    {totalMemories}
                  </h3>

                  <small className="text-secondary">
                    Across all users
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-purple">
                  <i className="bi bi-images"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">
                    Total Files
                  </p>

                  <h3 className="fw-bold mb-1">
                    {totalFiles}
                  </h3>

                  <small className="text-secondary">
                    Documents and media
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-orange">
                  <i className="bi bi-folder2-open"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          REVENUE + STORAGE
      -------------------------------------------------- */}

      <section className="row g-4 mb-4">
        <div className="col-12 col-xl-7">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <p className="text-secondary small mb-1">
                    Platform Storage
                  </p>

                  <h3 className="h5 fw-bold mb-1">
                    Storage Usage
                  </h3>

                  <p className="text-secondary small mb-0">
                    Total storage currently used across LifeVault.
                  </p>
                </div>

                <Link
                  to="/admin/storage-packs"
                  className="btn btn-sm btn-outline-dark"
                >
                  Manage
                </Link>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="fw-semibold">
                  {storageUsed.toFixed(2)} GB used
                </span>

                <span className="text-secondary">
                  {totalStorage.toFixed(2)} GB total
                </span>
              </div>

              <div
                className="progress"
                style={{ height: "10px" }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${storagePercentage}%`,
                  }}
                ></div>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <small className="text-secondary">
                  {storagePercentage.toFixed(1)}% used
                </small>

                <small className="text-secondary">
                  {(totalStorage - storageUsed).toFixed(2)} GB available
                </small>
              </div>

              <hr className="my-4" />

              <div className="d-flex flex-column gap-3">
                {storageCategories.map((item) => (
                  <div
                    key={item.label}
                    className="admin-storage-row"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="admin-storage-icon">
                        <i className={`bi ${item.icon}`}></i>
                      </div>

                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="fw-semibold">
                            {item.label}
                          </span>

                          <span className="text-secondary small">
                            {item.size}
                          </span>
                        </div>

                        <div
                          className="progress"
                          style={{ height: "6px" }}
                        >
                          <div
                            className="progress-bar"
                            style={{
                              width: `${item.percentage}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <p className="text-secondary small mb-1">
                    Payments
                  </p>

                  <h3 className="h5 fw-bold mb-1">
                    Revenue Overview
                  </h3>

                  <p className="text-secondary small mb-0">
                    Storage upgrade purchases.
                  </p>
                </div>

                <Link
                  to="/admin/payments"
                  className="btn btn-sm btn-outline-dark"
                >
                  View
                </Link>
              </div>

              <div className="admin-revenue-value">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </div>

              <p className="text-secondary small mb-4">
                Total revenue generated
              </p>

              <div className="admin-revenue-item">
                <span>
                  <i className="bi bi-cloud-plus me-2"></i>
                  Storage packs sold
                </span>

                <strong>
                  {storagePacksSold}
                </strong>
              </div>

              <div className="admin-revenue-item">
                <span>
                  <i className="bi bi-bar-chart me-2"></i>
                  Average purchase
                </span>

                <strong>
                  ₹{Math.round(
                    totalRevenue / storagePacksSold,
                  )}
                </strong>
              </div>

              <div className="admin-revenue-item">
                <span>
                  <i className="bi bi-graph-up-arrow me-2"></i>
                  Monthly growth
                </span>

                <strong className="text-success">
                  +18%
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          USERS + ACTIVITY
      -------------------------------------------------- */}

      <section className="row g-4 mb-4">
        <div className="col-12 col-xl-6">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <p className="text-secondary small mb-1">
                    User Management
                  </p>

                  <h3 className="h5 fw-bold mb-0">
                    Recent Users
                  </h3>
                </div>

                <Link
                  to="/admin/users"
                  className="btn btn-sm btn-outline-dark"
                >
                  View All
                </Link>
              </div>

              <div className="d-flex flex-column gap-3">
                {mockUsers
                  .slice(0, 5)
                  .map((user) => (
                    <div
                      key={user.id}
                      className="admin-user-row"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="admin-user-avatar">
                          {user.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-width-0">
                          <div className="fw-semibold text-truncate">
                            {user.name}
                          </div>

                          <small className="text-secondary text-truncate d-block">
                            {user.email}
                          </small>
                        </div>
                      </div>

                      <span className="badge text-bg-light">
                        {user.role}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <p className="text-secondary small mb-1">
                    Platform Activity
                  </p>

                  <h3 className="h5 fw-bold mb-0">
                    Recent Activity
                  </h3>
                </div>

                <Link
                  to="/admin/reports"
                  className="btn btn-sm btn-outline-dark"
                >
                  Reports
                </Link>
              </div>

              <div className="d-flex flex-column gap-3">
                {recentActivity.map(
                  (activity) => (
                    <div
                      key={activity.id}
                      className="admin-activity-row"
                    >
                      <div
                        className={`admin-activity-icon admin-activity-${activity.type}`}
                      >
                        <i
                          className={`bi ${activity.icon}`}
                        ></i>
                      </div>

                      <div className="flex-grow-1">
                        <div className="fw-semibold">
                          {activity.title}
                        </div>

                        <p className="text-secondary small mb-0">
                          {activity.description}
                        </p>
                      </div>

                      <small className="text-secondary text-nowrap">
                        {activity.time}
                      </small>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          QUICK ACTIONS
      -------------------------------------------------- */}

      <section>
        <div className="mb-3">
          <p className="text-secondary small mb-1">
            Administration
          </p>

          <h3 className="h5 fw-bold mb-0">
            Quick Actions
          </h3>
        </div>

        <div className="row g-3">
          <div className="col-12 col-sm-6 col-lg-3">
            <Link
              to="/admin/users"
              className="admin-quick-action"
            >
              <i className="bi bi-people"></i>

              <div>
                <strong>Manage Users</strong>
                <span>View and manage accounts</span>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <Link
              to="/admin/storage-packs"
              className="admin-quick-action"
            >
              <i className="bi bi-cloud-plus"></i>

              <div>
                <strong>Storage Packs</strong>
                <span>Manage storage offerings</span>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <Link
              to="/admin/payments"
              className="admin-quick-action"
            >
              <i className="bi bi-credit-card"></i>

              <div>
                <strong>Payments</strong>
                <span>Review transactions</span>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <Link
              to="/admin/statistics"
              className="admin-quick-action"
            >
              <i className="bi bi-bar-chart"></i>

              <div>
                <strong>Statistics</strong>
                <span>View platform analytics</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
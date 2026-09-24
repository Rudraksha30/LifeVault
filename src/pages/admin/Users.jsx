import { useMemo, useState } from "react";
import mockUsers from "../../data/mockUsers";

import "../../styles/admin.css";

function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [selectedUser, setSelectedUser] = useState(null);
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchesRole =
        roleFilter === "ALL" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const totalUsers = users.length;

  const adminCount = users.filter(
    (user) => user.role === "ADMIN",
  ).length;

  const userCount = users.filter(
    (user) => user.role === "USER",
  ).length;

  const activeUsers = users.filter(
    (user) => user.status !== "inactive",
  ).length;

  const handleToggleStatus = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.id !== userId) {
          return user;
        }

        return {
          ...user,
          status:
            user.status === "inactive"
              ? "active"
              : "inactive",
        };
      }),
    );
  };

  const handleDeleteUser = (userId) => {
    const user = users.find(
      (item) => item.id === userId,
    );

    if (!user) {
      return;
    }

    if (user.role === "ADMIN") {
      window.alert(
        "Admin accounts cannot be deleted from this panel.",
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmed) {
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.filter(
        (item) => item.id !== userId,
      ),
    );

    setSelectedUser(null);
  };

  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "?";
  };

  return (
    <div className="container-fluid px-0 admin-dashboard">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <section className="admin-page-header mb-4">
        <div>
          <p className="text-secondary small mb-1">
            LifeVault administration
          </p>

          <h2 className="fw-bold mb-1">
            User Management
          </h2>

          <p className="text-secondary mb-0">
            View and manage LifeVault user accounts.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* STATISTICS */}
      {/* -------------------------------------------------- */}

      <section className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">
                    Total Accounts
                  </p>

                  <h3 className="fw-bold mb-1">
                    {totalUsers}
                  </h3>

                  <small className="text-secondary">
                    All registered accounts
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
                    Active Accounts
                  </p>

                  <h3 className="fw-bold mb-1">
                    {activeUsers}
                  </h3>

                  <small className="text-success">
                    <i className="bi bi-person-check me-1"></i>
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
                    Regular Users
                  </p>

                  <h3 className="fw-bold mb-1">
                    {userCount}
                  </h3>

                  <small className="text-secondary">
                    USER accounts
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-purple">
                  <i className="bi bi-person"></i>
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
                    Administrators
                  </p>

                  <h3 className="fw-bold mb-1">
                    {adminCount}
                  </h3>

                  <small className="text-secondary">
                    ADMIN accounts
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-orange">
                  <i className="bi bi-shield-lock"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* USER TABLE */}
      {/* -------------------------------------------------- */}

      <section>
        <div className="card admin-panel-card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
              <div>
                <p className="text-secondary small mb-1">
                  Accounts
                </p>

                <h3 className="h5 fw-bold mb-1">
                  All Users
                </h3>

                <p className="text-secondary small mb-0">
                  Manage registered LifeVault accounts.
                </p>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-2">
                <div className="position-relative">
                  <i
                    className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-secondary"
                    style={{ pointerEvents: "none" }}
                  ></i>

                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                  />
                </div>

                <select
                  className="form-select"
                  value={roleFilter}
                  onChange={(event) =>
                    setRoleFilter(event.target.value)
                  }
                >
                  <option value="ALL">
                    All Roles
                  </option>

                  <option value="USER">
                    User
                  </option>

                  <option value="ADMIN">
                    Admin
                  </option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="text-end">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => {
                      const isActive =
                        user.status !== "inactive";

                      return (
                        <tr key={user.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <div className="admin-user-avatar">
                                {getInitial(user.name)}
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
                          </td>

                          <td>
                            <span className="badge text-bg-light">
                              {user.role}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`badge ${
                                isActive
                                  ? "text-bg-success"
                                  : "text-bg-secondary"
                              }`}
                            >
                              {isActive
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </td>

                          <td>
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                title="View user"
                                onClick={() =>
                                  setSelectedUser(user)
                                }
                              >
                                <i className="bi bi-eye"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-dark"
                                title={
                                  isActive
                                    ? "Deactivate user"
                                    : "Activate user"
                                }
                                onClick={() =>
                                  handleToggleStatus(
                                    user.id,
                                  )
                                }
                              >
                                <i
                                  className={`bi ${
                                    isActive
                                      ? "bi-person-dash"
                                      : "bi-person-check"
                                  }`}
                                ></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                title="Delete user"
                                onClick={() =>
                                  handleDeleteUser(
                                    user.id,
                                  )
                                }
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-5"
                      >
                        <div className="text-secondary">
                          <i className="bi bi-people fs-2 d-block mb-2"></i>
                          No users found.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* USER DETAILS MODAL */}
      {/* -------------------------------------------------- */}

      {selectedUser && (
        <div
          className="lifevault-modal-backdrop"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="lifevault-modal-dialog"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="lifevault-modal-content shadow">
              <div className="modal-header lifevault-modal-header">
                <div>
                  <h5 className="modal-title fw-bold mb-1">
                    User Details
                  </h5>

                  <p className="text-secondary small mb-0">
                    Account information
                  </p>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setSelectedUser(null)
                  }
                ></button>
              </div>

              <div className="lifevault-modal-body">
                <div className="text-center mb-4">
                  <div className="admin-user-avatar mx-auto mb-3">
                    {getInitial(selectedUser.name)}
                  </div>

                  <h4 className="fw-bold mb-1">
                    {selectedUser.name}
                  </h4>

                  <p className="text-secondary mb-0">
                    {selectedUser.email}
                  </p>
                </div>

                <div className="admin-user-detail-list">
                  <div className="admin-user-detail-item">
                    <span className="text-secondary">
                      User ID
                    </span>

                    <strong>
                      #{selectedUser.id}
                    </strong>
                  </div>

                  <div className="admin-user-detail-item">
                    <span className="text-secondary">
                      Role
                    </span>

                    <strong>
                      {selectedUser.role}
                    </strong>
                  </div>

                  <div className="admin-user-detail-item">
                    <span className="text-secondary">
                      Status
                    </span>

                    <strong>
                      {selectedUser.status !==
                      "inactive"
                        ? "Active"
                        : "Inactive"}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="modal-footer lifevault-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setSelectedUser(null)
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
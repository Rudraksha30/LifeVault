import { useMemo, useState } from "react";
import mockPayments from "../../data/mockPayments";

import "../../styles/admin.css";

function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [planFilter, setPlanFilter] = useState("ALL");
  const totalRevenue = mockPayments
    .filter((payment) => payment.status === "success")
    .reduce((total, payment) => total + payment.amount, 0);
  const successfulPayments = mockPayments.filter(
    (payment) => payment.status === "success",
  ).length;
  const pendingPayments = mockPayments.filter(
    (payment) => payment.status === "pending",
  ).length;
  const refundedPayments = mockPayments.filter(
    (payment) => payment.status === "refunded",
  ).length;
  const filteredPayments = useMemo(() => {
    return mockPayments.filter((payment) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        payment.id.toLowerCase().includes(search) ||
        payment.userName.toLowerCase().includes(search) ||
        payment.userEmail.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" || payment.status === statusFilter;

      const matchesPlan = planFilter === "ALL" || payment.planId === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [searchTerm, statusFilter, planFilter]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const config = {
      success: {
        className: "text-bg-success",
        icon: "bi-check-circle",
        label: "Success",
      },
      pending: {
        className: "text-bg-warning",
        icon: "bi-clock",
        label: "Pending",
      },
      refunded: {
        className: "text-bg-secondary",
        icon: "bi-arrow-counterclockwise",
        label: "Refunded",
      },
    };

    const current = config[status] || {
      className: "text-bg-light",
      icon: "bi-question-circle",
      label: status,
    };

    return (
      <span className={`badge ${current.className}`}>
        <i className={`bi ${current.icon} me-1`}></i>
        {current.label}
      </span>
    );
  };

  return (
    <div className="container-fluid px-0 admin-dashboard">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <section className="admin-page-header mb-4">
        <div>
          <p className="text-secondary small mb-1">LifeVault administration</p>
          <h2 className="fw-bold mb-1">Payments</h2>
          <p className="text-secondary mb-0">
            Review storage upgrade transactions and payment activity.
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
                  <p className="text-secondary small mb-2">Total Revenue</p>

                  <h3 className="fw-bold mb-1">
                    ₹{totalRevenue.toLocaleString("en-IN")}
                  </h3>

                  <small className="text-success">
                    <i className="bi bi-graph-up-arrow me-1"></i>
                    Successful payments
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-blue">
                  <i className="bi bi-currency-rupee"></i>
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
                  <p className="text-secondary small mb-2">Successful</p>
                  <h3 className="fw-bold mb-1">{successfulPayments}</h3>
                  <small className="text-success">
                    <i className="bi bi-check-circle me-1"></i>
                    Completed transactions
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-green">
                  <i className="bi bi-check-circle"></i>
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
                  <p className="text-secondary small mb-2">Pending</p>
                  <h3 className="fw-bold mb-1">{pendingPayments}</h3>
                  <small className="text-warning">
                    <i className="bi bi-clock me-1"></i>
                    Awaiting completion
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-purple">
                  <i className="bi bi-hourglass-split"></i>
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
                  <p className="text-secondary small mb-2">Refunded</p>
                  <h3 className="fw-bold mb-1">{refundedPayments}</h3>
                  <small className="text-secondary">
                    Reversed transactions
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-orange">
                  <i className="bi bi-arrow-counterclockwise"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* TRANSACTIONS */}
      {/* -------------------------------------------------- */}

      <section>
        <div className="card admin-panel-card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
              <div>
                <p className="text-secondary small mb-1">Transactions</p>
                <h3 className="h5 fw-bold mb-1">Payment History</h3>
                <p className="text-secondary small mb-0">
                  Storage pack purchase records.
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
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>

                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option value="ALL">All Status</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                  <option value="refunded">Refunded</option>
                </select>

                <select
                  className="form-select"
                  value={planFilter}
                  onChange={(event) => setPlanFilter(event.target.value)}
                >
                  <option value="ALL">All Packs</option>
                  <option value="mini">Mini Pack</option>
                  <option value="pro">Pro</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Transaction</th>
                    <th>User</th>
                    <th>Storage Pack</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td>
                          <span className="fw-semibold">{payment.id}</span>
                        </td>

                        <td>
                          <div>
                            <div className="fw-semibold">
                              {payment.userName}
                            </div>

                            <small className="text-secondary">
                              {payment.userEmail}
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="fw-semibold">{payment.planName}</div>

                          <small className="text-secondary">
                            +{payment.storageGB} GB
                          </small>
                        </td>

                        <td>
                          <span className="fw-semibold">
                            ₹{payment.amount.toLocaleString("en-IN")}
                          </span>
                        </td>

                        <td>
                          <span className="text-secondary">One-time</span>
                        </td>

                        <td>{getStatusBadge(payment.status)}</td>

                        <td>
                          <div className="fw-semibold">
                            {formatDate(payment.date)}
                          </div>

                          <small className="text-secondary">
                            {formatTime(payment.date)}
                          </small>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-5">
                        <div className="text-secondary">
                          <i className="bi bi-credit-card fs-2 d-block mb-2"></i>
                          No payments found.
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
      {/* PAYMENT INFORMATION */}
      {/* -------------------------------------------------- */}

      <section className="mt-4">
        <div className="card admin-panel-card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex align-items-start gap-3">
              <div className="admin-storage-pack-icon">
                <i className="bi bi-shield-check"></i>
              </div>

              <div>
                <h3 className="h6 fw-bold mb-2">Payment Information</h3>

                <p className="text-secondary small mb-2">
                  LifeVault uses one-time payments for storage upgrades. There
                  are no recurring subscriptions in the current project design.
                </p>

                <p className="text-secondary small mb-0">
                  The transactions shown here are frontend demo records. Real
                  payment processing and transaction persistence will be
                  connected through the backend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Payments;

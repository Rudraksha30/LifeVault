import { useMemo, useState } from "react";
import mockUsers from "../../data/mockUsers";
import mockPayments from "../../data/mockPayments";

import "../../styles/admin.css";

function Reports() {
  const [reportType, setReportType] = useState("overview");
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(
    (user) => user.status !== "inactive",
  ).length;

  const totalTransactions = mockPayments.length;
  const successfulPayments = mockPayments.filter(
    (payment) => payment.status === "success",
  );

  const totalRevenue = successfulPayments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  const storagePacksSold = successfulPayments.length;
  const totalStorageSold = successfulPayments.reduce(
    (total, payment) => total + payment.storageGB,
    0,
  );

  const planBreakdown = useMemo(() => {
    const counts = {
      mini: 0,
      pro: 0,
      premium: 0,
    };

    successfulPayments.forEach((payment) => {
      if (counts[payment.planId] !== undefined) {
        counts[payment.planId] += 1;
      }
    });

    return [
      {
        id: "mini",
        name: "Mini Pack",
        count: counts.mini,
        icon: "bi-cloud",
      },
      {
        id: "pro",
        name: "Pro",
        count: counts.pro,
        icon: "bi-cloud-plus",
      },
      {
        id: "premium",
        name: "Premium",
        count: counts.premium,
        icon: "bi-gem",
      },
    ];
  }, [successfulPayments]);

  const reportData = {
    overview: {
      title: "Platform Overview",
      description: "A summary of users, transactions and storage activity.",
    },

    users: {
      title: "User Report",
      description: "Current account and user activity summary.",
    },

    payments: {
      title: "Payment Report",
      description: "Successful storage pack transaction summary.",
    },

    storage: {
      title: "Storage Report",
      description: "Storage capacity and storage pack sales summary.",
    },
  };

  const currentReport = reportData[reportType];

  return (
    <div className="container-fluid px-0 admin-dashboard">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <section className="admin-page-header mb-4">
        <div>
          <p className="text-secondary small mb-1">LifeVault administration</p>

          <h2 className="fw-bold mb-1">Reports</h2>

          <p className="text-secondary mb-0">
            Generate and review LifeVault platform reports.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* REPORT SELECTOR */}
      {/* -------------------------------------------------- */}

      <section className="card admin-panel-card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <p className="text-secondary small mb-1">Report Type</p>

              <h3 className="h5 fw-bold mb-1">{currentReport.title}</h3>

              <p className="text-secondary small mb-0">
                {currentReport.description}
              </p>
            </div>

            <select
              className="form-select"
              style={{ maxWidth: "240px" }}
              value={reportType}
              onChange={(event) => setReportType(event.target.value)}
            >
              <option value="overview">Platform Overview</option>
              <option value="users">User Report</option>
              <option value="payments">Payment Report</option>
              <option value="storage">Storage Report</option>
            </select>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PRIMARY REPORT STATISTICS */}
      {/* -------------------------------------------------- */}

      <section className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card admin-stat-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small mb-2">Registered Users</p>

                  <h3 className="fw-bold mb-1">{totalUsers}</h3>

                  <small className="text-secondary">
                    {activeUsers} currently active
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
                  <p className="text-secondary small mb-2">Transactions</p>

                  <h3 className="fw-bold mb-1">{totalTransactions}</h3>

                  <small className="text-secondary">
                    All recorded payments
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-purple">
                  <i className="bi bi-credit-card"></i>
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
                  <p className="text-secondary small mb-2">Revenue</p>

                  <h3 className="fw-bold mb-1">
                    ₹{totalRevenue.toLocaleString("en-IN")}
                  </h3>

                  <small className="text-success">
                    From successful payments
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-green">
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
                  <p className="text-secondary small mb-2">Storage Sold</p>

                  <h3 className="fw-bold mb-1">{totalStorageSold} GB</h3>

                  <small className="text-secondary">
                    Across successful purchases
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-orange">
                  <i className="bi bi-cloud-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* REPORT CONTENT */}
      {/* -------------------------------------------------- */}

      <section className="row g-4">
        {/* Summary */}
        <div className="col-12 col-xl-7">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="mb-4">
                <p className="text-secondary small mb-1">Summary</p>

                <h3 className="h5 fw-bold mb-1">{currentReport.title}</h3>

                <p className="text-secondary small mb-0">
                  Current frontend report snapshot.
                </p>
              </div>

              <div className="admin-revenue-item">
                <span>
                  <i className="bi bi-people me-2"></i>
                  Total registered users
                </span>

                <strong>{totalUsers}</strong>
              </div>

              <div className="admin-revenue-item">
                <span>
                  <i className="bi bi-person-check me-2"></i>
                  Active users
                </span>

                <strong>{activeUsers}</strong>
              </div>

              <div className="admin-revenue-item">
                <span>
                  <i className="bi bi-check-circle me-2"></i>
                  Successful payments
                </span>

                <strong>{successfulPayments.length}</strong>
              </div>

              <div className="admin-revenue-item">
                <span>
                  <i className="bi bi-currency-rupee me-2"></i>
                  Revenue generated
                </span>

                <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>
              </div>

              <div className="admin-revenue-item">
                <span>
                  <i className="bi bi-cloud me-2"></i>
                  Storage sold
                </span>

                <strong>{totalStorageSold} GB</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Pack distribution */}
        <div className="col-12 col-xl-5">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="mb-4">
                <p className="text-secondary small mb-1">Sales Distribution</p>

                <h3 className="h5 fw-bold mb-1">Storage Pack Sales</h3>

                <p className="text-secondary small mb-0">
                  Successful purchases by pack.
                </p>
              </div>

              <div className="d-flex flex-column gap-3">
                {planBreakdown.map((plan) => {
                  const percentage =
                    storagePacksSold > 0
                      ? (plan.count / storagePacksSold) * 100
                      : 0;

                  return (
                    <div key={plan.id} className="admin-storage-row">
                      <div className="d-flex align-items-center gap-3">
                        <div className="admin-storage-icon">
                          <i className={`bi ${plan.icon}`}></i>
                        </div>

                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between mb-1">
                            <span className="fw-semibold">{plan.name}</span>

                            <span className="text-secondary small">
                              {plan.count} sold
                            </span>
                          </div>

                          <div className="progress" style={{ height: "6px" }}>
                            <div
                              className="progress-bar"
                              style={{
                                width: `${percentage}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* REPORT NOTE */}
      {/* -------------------------------------------------- */}

      <section className="mt-4">
        <div className="card admin-panel-card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex align-items-start gap-3">
              <div className="admin-storage-pack-icon">
                <i className="bi bi-file-earmark-bar-graph"></i>
              </div>

              <div>
                <h3 className="h6 fw-bold mb-2">Report Status</h3>

                <p className="text-secondary small mb-0">
                  These reports currently use frontend demo data. During the
                  backend phase, report values will be generated from SQL data
                  through Spring Boot APIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reports;

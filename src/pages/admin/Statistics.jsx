import { useMemo } from "react";
import mockUsers from "../../data/mockUsers";
import mockPayments from "../../data/mockPayments";

import "../../styles/admin.css";

function Statistics() {
  const successfulPayments = useMemo(
    () => mockPayments.filter((payment) => payment.status === "success"),
    [],
  );

  const totalRevenue = successfulPayments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  const totalStorageSold = successfulPayments.reduce(
    (total, payment) => total + payment.storageGB,
    0,
  );

  const planStats = useMemo(() => {
    const plans = {
      mini: {
        name: "Mini Pack",
        purchases: 0,
        revenue: 0,
        storage: 0,
        icon: "bi-cloud",
      },
      pro: {
        name: "Pro",
        purchases: 0,
        revenue: 0,
        storage: 0,
        icon: "bi-cloud-plus",
      },
      premium: {
        name: "Premium",
        purchases: 0,
        revenue: 0,
        storage: 0,
        icon: "bi-gem",
      },
    };

    successfulPayments.forEach((payment) => {
      const plan = plans[payment.planId];

      if (!plan) {
        return;
      }

      plan.purchases += 1;
      plan.revenue += payment.amount;
      plan.storage += payment.storageGB;
    });

    return Object.values(plans);
  }, [successfulPayments]);

  const averagePurchase =
    successfulPayments.length > 0
      ? totalRevenue / successfulPayments.length
      : 0;

  const activeUsers = mockUsers.filter(
    (user) => user.status !== "inactive",
  ).length;

  const inactiveUsers = mockUsers.filter(
    (user) => user.status === "inactive",
  ).length;

  const userActivityPercentage =
    mockUsers.length > 0 ? (activeUsers / mockUsers.length) * 100 : 0;

  const revenuePercentage =
    totalRevenue > 0 ? (successfulPayments.length / totalRevenue) * 100 : 0;

  return (
    <div className="container-fluid px-0 admin-dashboard">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <section className="admin-page-header mb-4">
        <div>
          <p className="text-secondary small mb-1">LifeVault administration</p>

          <h2 className="fw-bold mb-1">Statistics</h2>

          <p className="text-secondary mb-0">
            Analyze platform usage, storage sales and user activity.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* KEY METRICS */}
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
                    From successful payments
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
                  <p className="text-secondary small mb-2">Storage Sold</p>

                  <h3 className="fw-bold mb-1">{totalStorageSold} GB</h3>

                  <small className="text-secondary">
                    Through storage upgrades
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-purple">
                  <i className="bi bi-cloud-plus"></i>
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
                  <p className="text-secondary small mb-2">Average Purchase</p>

                  <h3 className="fw-bold mb-1">
                    ₹{Math.round(averagePurchase)}
                  </h3>

                  <small className="text-secondary">
                    Per successful transaction
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-green">
                  <i className="bi bi-bar-chart"></i>
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
                  <p className="text-secondary small mb-2">Active Users</p>

                  <h3 className="fw-bold mb-1">{activeUsers}</h3>

                  <small className="text-success">
                    {userActivityPercentage.toFixed(0)}% of accounts
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-orange">
                  <i className="bi bi-activity"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PACK PERFORMANCE + USER ACTIVITY */}
      {/* -------------------------------------------------- */}

      <section className="row g-4 mb-4">
        <div className="col-12 col-xl-7">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="mb-4">
                <p className="text-secondary small mb-1">Sales Analytics</p>

                <h3 className="h5 fw-bold mb-1">Storage Pack Performance</h3>

                <p className="text-secondary small mb-0">
                  Compare purchases, revenue and storage sold by pack.
                </p>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Pack</th>
                      <th>Purchases</th>
                      <th>Storage</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>

                  <tbody>
                    {planStats.map((plan) => (
                      <tr key={plan.name}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div className="admin-storage-icon">
                              <i className={`bi ${plan.icon}`}></i>
                            </div>

                            <span className="fw-semibold">{plan.name}</span>
                          </div>
                        </td>

                        <td>{plan.purchases}</td>

                        <td>{plan.storage} GB</td>

                        <td>
                          <span className="fw-semibold">
                            ₹{plan.revenue.toLocaleString("en-IN")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="mb-4">
                <p className="text-secondary small mb-1">User Analytics</p>

                <h3 className="h5 fw-bold mb-1">Account Activity</h3>

                <p className="text-secondary small mb-0">
                  Current user status distribution.
                </p>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">Active Users</span>

                  <span className="text-secondary">{activeUsers}</span>
                </div>

                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    style={{
                      width: `${userActivityPercentage}%`,
                    }}
                  ></div>
                </div>

                <small className="text-secondary">
                  {userActivityPercentage.toFixed(1)}% of all accounts
                </small>
              </div>

              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">Inactive Users</span>

                  <span className="text-secondary">{inactiveUsers}</span>
                </div>

                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        mockUsers.length > 0
                          ? (inactiveUsers / mockUsers.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>

                <small className="text-secondary">
                  {mockUsers.length > 0
                    ? ((inactiveUsers / mockUsers.length) * 100).toFixed(1)
                    : "0.0"}
                  % of all accounts
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* REVENUE INSIGHTS */}
      {/* -------------------------------------------------- */}

      <section className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="admin-storage-pack-icon mb-3">
                <i className="bi bi-wallet2"></i>
              </div>

              <p className="text-secondary small mb-1">Revenue</p>

              <h3 className="h4 fw-bold mb-2">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h3>

              <p className="text-secondary small mb-0">
                Total revenue from successful storage pack payments.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="admin-storage-pack-icon mb-3">
                <i className="bi bi-receipt"></i>
              </div>

              <p className="text-secondary small mb-1">
                Successful Transactions
              </p>

              <h3 className="h4 fw-bold mb-2">{successfulPayments.length}</h3>

              <p className="text-secondary small mb-0">
                Completed payments recorded in the current dataset.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card admin-panel-card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="admin-storage-pack-icon mb-3">
                <i className="bi bi-cloud"></i>
              </div>

              <p className="text-secondary small mb-1">Storage Added</p>

              <h3 className="h4 fw-bold mb-2">{totalStorageSold} GB</h3>

              <p className="text-secondary small mb-0">
                Total storage granted through successful purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* NOTE */}
      {/* -------------------------------------------------- */}

      <section>
        <div className="card admin-panel-card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex align-items-start gap-3">
              <div className="admin-storage-pack-icon">
                <i className="bi bi-info-circle"></i>
              </div>

              <div>
                <h3 className="h6 fw-bold mb-2">Statistics Information</h3>

                <p className="text-secondary small mb-0">
                  These statistics are calculated from the current frontend demo
                  data. During backend development, these calculations can be
                  generated directly from SQL queries through Spring Boot APIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Statistics;

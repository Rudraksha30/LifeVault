import { useState } from "react";
import storagePlans from "../../data/storagePlans";

import "../../styles/admin.css";

function StoragePacks() {
  const [plans, setPlans] = useState(
    storagePlans.map((plan) => ({
      ...plan,
      active: true,
    })),
  );

  const togglePlanStatus = (planId) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              active: !plan.active,
            }
          : plan,
      ),
    );
  };

  const totalPlans = plans.length;

  const activePlans = plans.filter(
    (plan) => plan.active,
  ).length;

  const repeatablePlans = plans.filter(
    (plan) => plan.repeatable,
  ).length;

  const premiumPlan = plans.find(
    (plan) => plan.id === "premium",
  );

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
            Storage Packs
          </h2>

          <p className="text-secondary mb-0">
            Manage storage offerings available to LifeVault users.
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
                    Total Packs
                  </p>

                  <h3 className="fw-bold mb-1">
                    {totalPlans}
                  </h3>

                  <small className="text-secondary">
                    Available storage offerings
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-blue">
                  <i className="bi bi-box-seam"></i>
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
                    Active Packs
                  </p>

                  <h3 className="fw-bold mb-1">
                    {activePlans}
                  </h3>

                  <small className="text-success">
                    <i className="bi bi-check-circle me-1"></i>
                    Currently available
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
                  <p className="text-secondary small mb-2">
                    Repeatable Packs
                  </p>

                  <h3 className="fw-bold mb-1">
                    {repeatablePlans}
                  </h3>

                  <small className="text-secondary">
                    Users can purchase again
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-purple">
                  <i className="bi bi-arrow-repeat"></i>
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
                    Premium Storage
                  </p>

                  <h3 className="fw-bold mb-1">
                    {premiumPlan?.storageGB || 0} GB
                  </h3>

                  <small className="text-secondary">
                    One-time Premium pack
                  </small>
                </div>

                <div className="admin-stat-icon admin-stat-icon-orange">
                  <i className="bi bi-gem"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* STORAGE PACKS */}
      {/* -------------------------------------------------- */}

      <section>
        <div className="card admin-panel-card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="mb-4">
              <p className="text-secondary small mb-1">
                Storage Configuration
              </p>

              <h3 className="h5 fw-bold mb-1">
                Available Storage Packs
              </h3>

              <p className="text-secondary small mb-0">
                Review pricing, storage amounts and purchase rules.
              </p>
            </div>

            <div className="row g-4">
              {plans.map((plan) => (
                <div
                  className="col-12 col-md-6 col-xl-4"
                  key={plan.id}
                >
                  <div
                    className={`admin-storage-pack-card h-100 ${
                      !plan.active
                        ? "admin-storage-pack-disabled"
                        : ""
                    }`}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div>
                        <div className="admin-storage-pack-icon">
                          <i
                            className={`bi ${
                              plan.id === "premium"
                                ? "bi-gem"
                                : plan.id === "pro"
                                  ? "bi-cloud-plus"
                                  : "bi-cloud"
                            }`}
                          ></i>
                        </div>
                      </div>

                      <span
                        className={`badge ${
                          plan.active
                            ? "text-bg-success"
                            : "text-bg-secondary"
                        }`}
                      >
                        {plan.active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>

                    <h4 className="h5 fw-bold mb-1">
                      {plan.name}
                    </h4>

                    <p className="text-secondary small mb-4">
                      {plan.description}
                    </p>

                    <div className="admin-pack-storage-value">
                      {plan.storageGB} GB
                    </div>

                    <div className="text-secondary small mb-4">
                      Additional LifeVault storage
                    </div>

                    <div className="admin-pack-price">
                      ₹
                      {plan.price.toLocaleString(
                        "en-IN",
                      )}
                    </div>

                    <div className="text-secondary small mb-4">
                      One-time payment
                    </div>

                    <div className="admin-storage-pack-details">
                      <div>
                        <span className="text-secondary">
                          Purchase type
                        </span>

                        <strong>
                          {plan.type}
                        </strong>
                      </div>

                      <div>
                        <span className="text-secondary">
                          Repeatable
                        </span>

                        <strong>
                          {plan.repeatable
                            ? "Yes"
                            : "No"}
                        </strong>
                      </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-secondary small">
                        {plan.repeatable
                          ? "Can be purchased multiple times"
                          : "One purchase per user"}
                      </span>

                      <button
                        type="button"
                        className={`btn btn-sm ${
                          plan.active
                            ? "btn-outline-danger"
                            : "btn-outline-success"
                        }`}
                        onClick={() =>
                          togglePlanStatus(plan.id)
                        }
                      >
                        <i
                          className={`bi ${
                            plan.active
                              ? "bi-pause-circle me-1"
                              : "bi-play-circle me-1"
                          }`}
                        ></i>

                        {plan.active
                          ? "Disable"
                          : "Enable"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PROJECT RULES */}
      {/* -------------------------------------------------- */}

      <section className="mt-4">
        <div className="card admin-panel-card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex align-items-start gap-3">
              <div className="admin-storage-pack-icon">
                <i className="bi bi-info-circle"></i>
              </div>

              <div>
                <h3 className="h6 fw-bold mb-2">
                  Storage Rules
                </h3>

                <p className="text-secondary small mb-2">
                  LifeVault starts users with 4 GB of free
                  storage. Purchased packs add storage to the
                  account.
                </p>

                <p className="text-secondary small mb-0">
                  A user's total storage cannot exceed the
                  project's 1 TB maximum limit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StoragePacks;
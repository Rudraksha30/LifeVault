function StoragePackCard({
  plan,
  currentStorage,
  purchasedBefore,
  onPurchase,
}) {
  const maximumStorage = 1024;
  const exceedsMaximum = currentStorage + plan.storageGB > maximumStorage;
  const alreadyPurchased = !plan.repeatable && purchasedBefore;
  const unavailable = exceedsMaximum || alreadyPurchased;

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="card border-0 shadow-sm h-100 storage-plan-card">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h3 className="h5 fw-bold mb-1">{plan.name}</h3>

              <span className="text-secondary small">
                +{plan.storageGB} GB storage
              </span>
            </div>

            <div className="storage-plan-icon">
              <i className="bi bi-cloud-plus"></i>
            </div>
          </div>

          <h4 className="fw-bold mb-1">₹{plan.price}</h4>
          <small className="text-secondary">One-time payment</small>
          <p className="text-secondary mt-3">{plan.description}</p>

          {/* ALREADY PURCHASED */}
          {alreadyPurchased ? (
            <div className="alert alert-success mb-0">
              <i className="bi bi-check-circle me-2"></i>
              Premium already purchased.
            </div>
          ) : exceedsMaximum ? (
            <div className="alert alert-light border mb-0">
              <i className="bi bi-info-circle me-2"></i>
              This pack would exceed your 1 TB storage limit.
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-dark w-100 mt-3"
              onClick={() => onPurchase(plan)}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Buy Storage
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoragePackCard;

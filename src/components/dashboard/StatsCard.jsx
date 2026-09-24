function StatsCard({ icon, value, label, iconClass }) {
  return (
    <div className="col-6 col-xl-3">
      <div className="card border-0 shadow-sm h-100 dashboard-card">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-secondary mb-2 small">{label}</p>
              <h2 className="fw-bold mb-0">{value}</h2>
            </div>

            <div className={`dashboard-stat-icon ${iconClass}`}>
              <i className={`bi ${icon}`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
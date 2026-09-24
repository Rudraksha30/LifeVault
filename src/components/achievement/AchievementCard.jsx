function AchievementCard({
  achievement,
  onView,
}) {
  const formattedDate = new Date(
    achievement.date
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const icons = {
    Education: "🎓",
    Career: "💼",
    Projects: "💻",
    Competition: "🥇",
    Personal: "⭐",
  };

  const icon =
    icons[achievement.category] || "🏆";

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div
        className={`card border-0 shadow-sm h-100 achievement-card ${
          achievement.featured
            ? "achievement-featured"
            : ""
        }`}
      >
        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="achievement-icon">
              <span>{icon}</span>
            </div>

            {achievement.featured && (
              <span className="badge text-bg-warning">
                <i className="bi bi-star-fill me-1"></i>
                Featured
              </span>
            )}
          </div>

          <h3 className="h5 fw-bold mb-2">
            {achievement.title}
          </h3>

          <p className="text-secondary small mb-2">
            {formattedDate}
          </p>

          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="badge text-bg-light">
              {achievement.category}
            </span>

            {achievement.importance === "Major" && (
              <span className="badge text-bg-warning">
                Major
              </span>
            )}
          </div>

          <p className="text-secondary achievement-description">
            {achievement.description}
          </p>

          <div className="d-flex align-items-center justify-content-between mt-4">
            {achievement.proofAttached ? (
              <span className="small text-secondary">
                <i className="bi bi-paperclip me-1"></i>
                Proof attached
              </span>
            ) : (
              <span className="small text-secondary">
                No proof attached
              </span>
            )}

            <button
              type="button"
              className="btn btn-sm btn-dark"
              onClick={() => onView(achievement)}
            >
              View
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AchievementCard;
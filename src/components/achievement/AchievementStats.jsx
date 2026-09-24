function AchievementStats({ achievements }) {
  const total = achievements.length;

  const education = achievements.filter(
    (achievement) =>
      achievement.category === "Education"
  ).length;

  const career = achievements.filter(
    (achievement) =>
      achievement.category === "Career"
  ).length;

  const projects = achievements.filter(
    (achievement) =>
      achievement.category === "Projects"
  ).length;

  return (
    <div className="row g-3 mb-4">
      <div className="col-6 col-xl-3">
        <div className="card border-0 shadow-sm achievement-stat-card">
          <div className="card-body p-3">
            <small className="text-secondary">
              Total
            </small>

            <h3 className="fw-bold mb-0 mt-1">
              {total}
            </h3>

            <span className="small text-secondary">
              Achievements
            </span>
          </div>
        </div>
      </div>

      <div className="col-6 col-xl-3">
        <div className="card border-0 shadow-sm achievement-stat-card">
          <div className="card-body p-3">
            <small className="text-secondary">
              Education
            </small>

            <h3 className="fw-bold mb-0 mt-1">
              {education}
            </h3>

            <span className="small text-secondary">
              Achievements
            </span>
          </div>
        </div>
      </div>

      <div className="col-6 col-xl-3">
        <div className="card border-0 shadow-sm achievement-stat-card">
          <div className="card-body p-3">
            <small className="text-secondary">
              Career
            </small>

            <h3 className="fw-bold mb-0 mt-1">
              {career}
            </h3>

            <span className="small text-secondary">
              Achievements
            </span>
          </div>
        </div>
      </div>

      <div className="col-6 col-xl-3">
        <div className="card border-0 shadow-sm achievement-stat-card">
          <div className="card-body p-3">
            <small className="text-secondary">
              Projects
            </small>

            <h3 className="fw-bold mb-0 mt-1">
              {projects}
            </h3>

            <span className="small text-secondary">
              Achievements
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementStats;
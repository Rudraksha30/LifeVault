function AIInsightCard({
    icon,
    title,
    value,
    description,
}) {
    return (
        <div className="card border-0 shadow-sm h-100 ai-insight-card">
            <div className="card-body p-4">

                <div className="d-flex align-items-start justify-content-between gap-3 mb-3">

                    <div className="ai-insight-icon">
                        <i className={`bi ${icon}`}></i>
                    </div>

                    <i className="bi bi-stars text-secondary"></i>

                </div>

                <h3 className="h6 fw-bold mb-2">
                    {title}
                </h3>

                {value && (
                    <h4 className="h5 fw-bold mb-2">
                        {value}
                    </h4>
                )}

                <p className="text-secondary small mb-0">
                    {description}
                </p>

            </div>
        </div>
    );
}

export default AIInsightCard;
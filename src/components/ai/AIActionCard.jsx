function AIActionCard({
    icon,
    title,
    description,
    onClick,
}) {
    return (
        <button
            type="button"
            className="ai-action-card"
            onClick={onClick}
        >
            <div className="ai-action-icon">
                <i className={`bi ${icon}`}></i>
            </div>

            <div className="text-start">
                <h3 className="h6 fw-bold mb-1">
                    {title}
                </h3>

                <p className="text-secondary small mb-0">
                    {description}
                </p>
            </div>

            <i className="bi bi-arrow-right ms-auto"></i>
        </button>
    );
}

export default AIActionCard;
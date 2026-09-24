function SettingsSection({
    icon,
    title,
    description,
    children,
}) {
    return (
        <section className="card border-0 shadow-sm settings-section">
            <div className="card-body p-4">

                <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="settings-section-icon">
                        <i className={`bi ${icon}`}></i>
                    </div>

                    <div>
                        <h3 className="h5 fw-bold mb-1">
                            {title}
                        </h3>

                        <p className="text-secondary small mb-0">
                            {description}
                        </p>
                    </div>
                </div>

                {children}

            </div>
        </section>
    );
}

export default SettingsSection;
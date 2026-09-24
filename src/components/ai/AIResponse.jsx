function AIResponse({
    title,
    children,
}) {
    return (
        <div className="card border-0 shadow-sm mt-4">
            <div className="card-body p-4">

                <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-stars"></i>

                    <h3 className="h6 fw-bold mb-0">
                        {title}
                    </h3>
                </div>

                {children}

            </div>
        </div>
    );
}

export default AIResponse;
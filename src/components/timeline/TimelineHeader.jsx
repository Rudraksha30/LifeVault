function TimelineHeader({ onAddMemory }) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div>
        <p className="text-secondary small mb-1">
          Your journey
        </p>

        <h2 className="fw-bold mb-1">My Timeline</h2>

        <p className="text-secondary mb-0">
          Every important moment, all in one place.
        </p>
      </div>

      <button
        type="button"
        className="btn btn-dark"
        onClick={onAddMemory}
      >
        <i className="bi bi-plus-lg me-2"></i>
        Add Memory
      </button>
    </div>
  );
}

export default TimelineHeader;
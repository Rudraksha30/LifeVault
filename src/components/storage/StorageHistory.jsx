function StorageHistory({ purchases }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="text-secondary small mb-1">Purchase History</p>

            <h3 className="h5 fw-bold mb-0">Storage Upgrades</h3>
          </div>

          <i className="bi bi-receipt fs-4"></i>
        </div>

        {purchases.length > 0 ? (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Pack</th>
                  <th>Storage</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td>{purchase.planName}</td>
                    <td>+{purchase.storageGB} GB</td>
                    <td>₹{purchase.amount}</td>
                    <td>{purchase.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="bi bi-receipt fs-2 text-secondary"></i>

            <p className="text-secondary mt-2 mb-0">No storage upgrades yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StorageHistory;

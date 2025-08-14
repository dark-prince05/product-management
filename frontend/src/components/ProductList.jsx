export default function ProductList({ items, onEdit, onDelete, loading }) {
  return (
    <div className="product-card">
      <div className="product-card-body">
        <h5 className="product-title">Products</h5>

        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th className="col-id">ID</th>
                <th>Name</th>
                <th className="col-price">Price</th>
                <th>Description</th>
                <th className="col-stock">Stocks</th>
                <th className="col-actions"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="loading-text">
                    Loading...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-text">
                    No products
                  </td>
                </tr>
              ) : (
                items.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td className="product-name">{p.name}</td>
                    <td>₹{Number(p.price).toFixed(2)}</td>
                    <td className="product-description">{p.description}</td>
                    <td>{p.stocks}</td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => onEdit(p)}>
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => onDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

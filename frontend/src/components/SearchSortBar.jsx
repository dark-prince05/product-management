export default function SearchSortBar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) {
  return (
    <div className="search-sort-bar">
      <div className="form-group">
        <label>Search</label>
        <input
          className="input-field"
          placeholder="Search by name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Sort by</label>
        <select
          className="select-field"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stocks">Stocks</option>
        </select>
      </div>

      <div className="form-group">
        <label>Order</label>
        <select
          className="select-field"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  );
}

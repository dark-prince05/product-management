import { useEffect, useMemo, useState, useRef } from "react";
import api from "./api";
import ProductForm from "./components/ProductForm";
import SearchSortBar from "./components/SearchSortBar";
import ProductList from "./components/ProductList";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const dialogRef = useRef();

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async (payload) => {
    try {
      if (editing) {
        await api.put(`/products/${editing.id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      setEditing(null);
      setShowForm(false);
      await loadProducts();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/products/${id}`);
      await loadProducts();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const searchText = search.trim().toLowerCase();
      return (
        !searchText ||
        p.name.toLowerCase().includes(searchText) ||
        p.description.toLowerCase().includes(searchText)
      );
    });
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortBy === "stocks") {
        return order === "asc" ? a.stocks - b.stocks : b.stocks - a.stocks;
      }
      return 0;
    });
    return filtered;
  }, [products, search, sortBy, order]);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="card">
          <div className="header">
            <h1>Product Management</h1>
            <button
              className="primary-btn"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
                openDialog();
              }}
            >
              + Add Product
            </button>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="search-bar">
            <SearchSortBar
              search={search}
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
              order={order}
              setOrder={setOrder}
            />
          </div>

          <div className="product-list">
            <ProductList
              items={filteredProducts}
              onEdit={(prod) => {
                setEditing(prod);
                openDialog();
              }}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {
        <dialog ref={dialogRef}>
          <div className="modal">
            <div className="modal-header">
              <h2>{editing ? "Update Product" : "Add Product"}</h2>
              <button className="close-btn" onClick={() => closeDialog()}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <ProductForm
                onSave={handleSave}
                onCancel={() => closeDialog()}
                editing={editing}
              />
            </div>
          </div>
        </dialog>
      }
    </div>
  );
}

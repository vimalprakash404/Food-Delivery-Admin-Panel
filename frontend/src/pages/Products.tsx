import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  categoryId: Category;
  price: number;
  status: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    status: "active",
  });
  const [editId, setEditId] = useState<string | null>(null);

  const loadProducts = () => {
    api.getProducts().then(setProducts);
  };

  const loadCategories = () => {
    api.getCategories().then(setCategories);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...formData, price: parseFloat(formData.price) };
    if (editId) {
      await api.updateProduct(editId, data);
      setEditId(null);
    } else {
      await api.createProduct(data);
    }
    setFormData({ name: "", categoryId: "", price: "", status: "active" });
    loadProducts();
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      categoryId: product.categoryId._id,
      price: product.price.toString(),
      status: product.status,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await api.deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div>
      <h1>Product Management</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <h2>{editId ? "Edit Product" : "Add Product"}</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="form-actions">
          <button type="submit">{editId ? "Update" : "Add"}</button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ name: "", categoryId: "", price: "", status: "active" });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.categoryId.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.status}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

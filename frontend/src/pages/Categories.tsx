import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Category {
  _id: string;
  name: string;
  description: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState<string | null>(null);

  const loadCategories = () => {
    api.getCategories().then(setCategories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await api.updateCategory(editId, formData);
      setEditId(null);
    } else {
      await api.createCategory(formData);
    }
    setFormData({ name: "", description: "" });
    loadCategories();
  };

  const handleEdit = (category: Category) => {
    setFormData({ name: category.name, description: category.description });
    setEditId(category._id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await api.deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div>
      <h1>Category Management</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <h2>{editId ? "Edit Category" : "Add Category"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <div className="form-actions">
          <button type="submit">{editId ? "Update" : "Add"}</button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ name: "", description: "" });
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
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button onClick={() => handleEdit(category)}>Edit</button>
                  <button onClick={() => handleDelete(category._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

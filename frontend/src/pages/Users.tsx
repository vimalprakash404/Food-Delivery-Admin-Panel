import { useEffect, useState } from "react";
import { api } from "../api/api";

interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [editId, setEditId] = useState<string | null>(null);

  const loadUsers = () => {
    api.getUsers().then(setUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await api.updateUser(editId, formData);
      setEditId(null);
    } else {
      await api.createUser(formData);
    }
    setFormData({ name: "", email: "", mobile: "" });
    loadUsers();
  };

  const handleEdit = (user: User) => {
    setFormData({ name: user.name, email: user.email, mobile: user.mobile });
    setEditId(user._id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await api.deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div>
      <h1>Users Management</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <h2>{editId ? "Edit User" : "Add User"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          required
        />
        <div className="form-actions">
          <button type="submit">{editId ? "Update" : "Add"}</button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ name: "", email: "", mobile: "" });
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
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

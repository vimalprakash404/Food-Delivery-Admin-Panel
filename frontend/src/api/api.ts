const API_BASE = "http://localhost:3000/api";

export const api = {
  getUsers: () => fetch(`${API_BASE}/users`).then((r) => r.json()),
  createUser: (data: any) =>
    fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateUser: (id: string, data: any) =>
    fetch(`${API_BASE}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteUser: (id: string) =>
    fetch(`${API_BASE}/users/${id}`, { method: "DELETE" }).then((r) => r.json()),

  getCategories: () => fetch(`${API_BASE}/categories`).then((r) => r.json()),
  createCategory: (data: any) =>
    fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateCategory: (id: string, data: any) =>
    fetch(`${API_BASE}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteCategory: (id: string) =>
    fetch(`${API_BASE}/categories/${id}`, { method: "DELETE" }).then((r) => r.json()),

  getProducts: () => fetch(`${API_BASE}/products`).then((r) => r.json()),
  createProduct: (data: any) =>
    fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateProduct: (id: string, data: any) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteProduct: (id: string) =>
    fetch(`${API_BASE}/products/${id}`, { method: "DELETE" }).then((r) => r.json()),

  createOrder: (data: any) =>
    fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  getDashboard: () => fetch(`${API_BASE}/dashboard`).then((r) => r.json()),
};

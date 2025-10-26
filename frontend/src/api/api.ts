const API_BASE = "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  getUsers: () => fetch(`${API_BASE}/users`, { headers: getHeaders() }).then((r) => r.json()),
  createUser: (data: any) =>
    fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateUser: (id: string, data: any) =>
    fetch(`${API_BASE}/users/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteUser: (id: string) =>
    fetch(`${API_BASE}/users/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then((r) => r.json()),

  getCategories: () => fetch(`${API_BASE}/categories`, { headers: getHeaders() }).then((r) => r.json()),
  createCategory: (data: any) =>
    fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateCategory: (id: string, data: any) =>
    fetch(`${API_BASE}/categories/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteCategory: (id: string) =>
    fetch(`${API_BASE}/categories/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then((r) => r.json()),

  getProducts: () => fetch(`${API_BASE}/products`, { headers: getHeaders() }).then((r) => r.json()),
  createProduct: (data: any) =>
    fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateProduct: (id: string, data: any) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  deleteProduct: (id: string) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then((r) => r.json()),

  createOrder: (data: any) =>
    fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  getDashboard: () => fetch(`${API_BASE}/dashboard`, { headers: getHeaders() }).then((r) => r.json()),
};

const API_BASE = "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    if (data.errors) {
      const errorMessages = data.errors
        .map((err: any) => err.message)
        .join(", ");
      throw new Error(errorMessages);
    }
    throw new Error(data.error || "An error occurred");
  }

  return data;
};

export const api = {
  getUsers: () => fetch(`${API_BASE}/users`, { headers: getHeaders() }).then(handleResponse),
  createUser: (data: any) =>
    fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateUser: (id: string, data: any) =>
    fetch(`${API_BASE}/users/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  deleteUser: (id: string) =>
    fetch(`${API_BASE}/users/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleResponse),

  getCategories: () => fetch(`${API_BASE}/categories`, { headers: getHeaders() }).then(handleResponse),
  createCategory: (data: any) =>
    fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateCategory: (id: string, data: any) =>
    fetch(`${API_BASE}/categories/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  deleteCategory: (id: string) =>
    fetch(`${API_BASE}/categories/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleResponse),

  getProducts: () => fetch(`${API_BASE}/products`, { headers: getHeaders() }).then(handleResponse),
  createProduct: (data: any) =>
    fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateProduct: (id: string, data: any) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  deleteProduct: (id: string) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleResponse),

  getOrders: () => fetch(`${API_BASE}/orders`, { headers: getHeaders() }).then(handleResponse),
  createOrder: (data: any) =>
    fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  getDashboard: () => fetch(`${API_BASE}/dashboard`, { headers: getHeaders() }).then(handleResponse),
};

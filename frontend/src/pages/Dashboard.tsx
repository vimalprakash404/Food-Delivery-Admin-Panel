import { useEffect, useState } from "react";
import { api } from "../api/api";

interface TopProduct {
  _id: string;
  name: string;
  totalQuantity: number;
  totalRevenue: number;
}

interface ProductStatus {
  _id: string;
  count: number;
}

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalItemsSold: number;
  topProducts: TopProduct[];
  productStatusBreakdown: ProductStatus[];
  recentOrdersCount: number;
  last7DaysRevenue: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    api.getDashboard().then(setStats);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">₹{stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <h2>Order Insights</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Average Order Value</h3>
          <p className="stat-value">₹{stats.averageOrderValue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Items Sold</h3>
          <p className="stat-value">{stats.totalItemsSold}</p>
        </div>
        <div className="stat-card">
          <h3>Recent Orders (7 Days)</h3>
          <p className="stat-value">{stats.recentOrdersCount}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue (Last 7 Days)</h3>
          <p className="stat-value">₹{stats.last7DaysRevenue.toFixed(2)}</p>
        </div>
      </div>

      <h2>Top Selling Products</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {stats.topProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.totalQuantity}</td>
                <td>₹{product.totalRevenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Product Status Breakdown</h2>
      <div className="stats-grid">
        {stats.productStatusBreakdown.map((status) => (
          <div key={status._id} className="stat-card">
            <h3>{status._id.charAt(0).toUpperCase() + status._id.slice(1)} Products</h3>
            <p className="stat-value">{status.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

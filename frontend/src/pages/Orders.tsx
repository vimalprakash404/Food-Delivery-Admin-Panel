import { useEffect, useState } from "react";
import { api } from "../api/api";

interface User {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface OrderItem {
  productId: string | Product;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: User;
  items: OrderItem[];
  totalAmount: number;
  orderDate: string;
}

export default function Orders() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const loadOrders = () => {
    api.getOrders().then(setOrders);
  };

  useEffect(() => {
    api.getUsers().then(setUsers);
    api.getProducts().then(setProducts);
    loadOrders();
  }, []);

  const addItem = () => {
    if (!selectedProduct) return;
    const product = products.find((p) => p._id === selectedProduct);
    if (!product) return;

    setItems([
      ...items,
      {
        productId: product._id,
        quantity,
        price: product.price,
      },
    ]);
    setSelectedProduct("");
    setQuantity(1);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || items.length === 0) {
      alert("Please select a user and add at least one item");
      return;
    }

    const totalAmount = calculateTotal();
    await api.createOrder({ userId, items, totalAmount });
    alert("Order created successfully!");
    setUserId("");
    setItems([]);
    loadOrders();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      <h1>Orders</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h2>All Orders</h2>
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId.name}</td>
                  <td>
                    {order.items.map((item, idx) => {
                      const productName = typeof item.productId === 'object'
                        ? item.productId.name
                        : 'Unknown';
                      return (
                        <div key={idx}>
                          {productName} x{item.quantity}
                        </div>
                      );
                    })}
                  </td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{formatDate(order.orderDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders yet.</p>
        )}
      </div>

      <h2>Create New Order</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <div className="order-items-section">
          <h3>Add Items</h3>
          <div className="add-item-form">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} - ${product.price.toFixed(2)}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              placeholder="Quantity"
            />
            <button type="button" onClick={addItem}>
              Add Item
            </button>
          </div>

          {items.length > 0 && (
            <div className="order-items-list">
              <h3>Order Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    const product = products.find((p) => p._id === item.productId);
                    return (
                      <tr key={index}>
                        <td>{product?.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button type="button" onClick={() => removeItem(index)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="order-total">
                <strong>Total Amount: ${calculateTotal().toFixed(2)}</strong>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="submit-order-btn">
          Create Order
        </button>
      </form>
    </div>
  );
}

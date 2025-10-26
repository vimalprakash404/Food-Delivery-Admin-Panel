# Food Delivery Admin Panel

A comprehensive full-stack admin panel for managing food delivery operations with JWT authentication, built with React.js, Node.js (Express), and MongoDB.

## Features

### Backend (Node.js + Express + MongoDB)
- ✅ RESTful API with complete CRUD operations
- ✅ MongoDB with Mongoose ODM
- ✅ JWT-based authentication system
- ✅ Password hashing with bcrypt
- ✅ Protected routes with authentication middleware
- ✅ Aggregation pipeline for advanced dashboard analytics
- ✅ Collections: Users, Categories, Products, Orders

### Frontend (React.js + Vite)
- ✅ Modern React 19 with TypeScript
- ✅ React Router for navigation
- ✅ Context API for authentication state management
- ✅ Protected routes requiring authentication
- ✅ Responsive design with clean, modern UI
- ✅ Comprehensive pages:
  - Login (Authentication)
  - Dashboard with real-time statistics
  - User Management
  - Category Management
  - Product Management
  - Order Creation & Management

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite, React Router, Context API |
| **Backend** | Node.js, Express 5, TypeScript, JWT, bcrypt |
| **Database** | MongoDB with Mongoose ODM |
| **Build Tools** | Vite, ts-node-dev |

## Prerequisites

Before running this application, ensure you have:

- **Node.js** v18 or higher
- **MongoDB** 
- **npm** or **yarn** package manager

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the **root directory**:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/food-delivery-admin

# JWT Secret (Change in production!)
JWT_SECRET=your-secret-key-change-this-in-production

# Server Port
PORT=5000

# Admin User Credentials (for createAdmin script)
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_MOBILE=1234567890
ADMIN_PASSWORD=admin123
```

⚠️ **Important**: Change the `JWT_SECRET` to a strong, unique value in production!

### 5. Start MongoDB

Ensure MongoDB is running:

```bash
mongod
```

Or if using MongoDB as a service:

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 6. Create Admin User

Create an admin user before first run:

```bash
cd backend
npm run create-admin
```

You should see:
```
✅ Admin user created successfully!
Email: admin@example.com
Password: admin123
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
✅ MongoDB connected
```

### Start Frontend Development Server

In a **new terminal**:

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## 📖 Usage Guide

### 1. Login to Admin Panel

1. Navigate to `http://localhost:5173`
2. You'll be redirected to the login page
3. Enter admin credentials:
   - **Email**: `admin@example.com`
   - **Password**: `admin123`
4. Click "Login"

### 2. Dashboard

View comprehensive statistics:
- **Overview**: Total users, products, orders, and revenue
- **Order Insights**: Average order value, items sold, recent orders
- **Top Products**: Best-selling products by quantity and revenue
- **Product Status**: Breakdown by active/inactive status
- **Recent Orders**: Latest 10 orders with details

### 3. User Management

- **Create**: Add new customers (name, email, mobile)
- **Update**: Edit existing user information
- **Delete**: Remove users from the system
- **View**: See all users in a sortable table

### 4. Category Management

- **Create**: Add product categories with descriptions
- **Update**: Edit category details
- **Delete**: Remove categories (ensure no products use it)
- **View**: Display all categories

### 5. Product Management

- **Create**: Add products with:
  - Name
  - Category selection
  - Price
  - Status (Active/Inactive)
- **Update**: Modify product details
- **Delete**: Remove products
- **View**: See all products with category info

### 6. Order Management

- **Create Orders**:
  1. Select a customer
  2. Add products with quantities
  3. Review calculated total
  4. Submit order
- **View Orders**: See all orders with:
  - Customer details
  - Order items
  - Total amount
  - Order date/time

## 🔌 API Endpoints

### 📮 Postman Collection

Test all API endpoints using our Postman collection:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/vimalprakashpk1999-2600812/food-delivery-admin-panel/collection/d2bhljj/backend-api-collection?action=share&creator=48945159)

**Direct Link**: [Food Delivery Admin Panel API Collection](https://www.postman.com/vimalprakashpk1999-2600812/food-delivery-admin-panel/collection/d2bhljj/backend-api-collection?action=share&creator=48945159)

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new admin | false |
| POST | `/api/auth/login` | Login with credentials | false |
| GET | `/api/auth/me` | Get current user | true |

### Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | List all users | true |
| POST | `/api/users` | Create new user | true |
| PUT | `/api/users/:id` | Update user | true |
| DELETE | `/api/users/:id` | Delete user | true |

### Categories
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | List all categories | true |
| POST | `/api/categories` | Create category | true |
| PUT | `/api/categories/:id` | Update category | true |
| DELETE | `/api/categories/:id` | Delete category | true |

### Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | List all products | true |
| POST | `/api/products` | Create product | true |
| PUT | `/api/products/:id` | Update product | true |
| DELETE | `/api/products/:id` | Delete product | true |

### Orders
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/orders` | List all orders | true |
| POST | `/api/orders` | Create order | true |

### Dashboard
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dashboard` | Get statistics | true |

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,           // Required
  email: String,          // Required, Unique
  mobile: String,         // Required
  password: String,       // Optional (hashed with bcrypt)
  role: String,           // Default: "user"
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

### Categories Collection
```javascript
{
  name: String,           // Required
  description: String,    // Required
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

### Products Collection
```javascript
{
  name: String,           // Required
  categoryId: ObjectId,   // Required, Reference to Category
  price: Number,          // Required
  status: String,         // Required, Default: "active"
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

### Orders Collection
```javascript
{
  userId: ObjectId,       // Required, Reference to User
  items: [{
    productId: ObjectId,  // Required, Reference to Product
    quantity: Number,     // Required
    price: Number         // Required
  }],
  totalAmount: Number,    // Required
  orderDate: Date,        // Default: Date.now
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## 🔐 Authentication Flow



1. User submits login credentials
2. Backend validates and returns JWT token
3. Token stored in browser localStorage
4. All API requests include token in Authorization header
5. Backend middleware verifies token
6. Protected routes accessible with valid token

## 🔒 Security Features

- ✅ **Password Hashing**: bcrypt with salt rounds
- ✅ **JWT Authentication**: Stateless token-based auth
- ✅ **Protected Routes**: Backend middleware verification
- ✅ **Frontend Guards**: Route protection with redirects
- ✅ **Secure Headers**: Authorization Bearer tokens
- ✅ **Input Validation**: Server-side validation

## 📁 Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                 # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.ts     # Authentication logic
│   │   │   ├── userController.ts
│   │   │   ├── categoryController.ts
│   │   │   ├── productController.ts
│   │   │   ├── orderController.ts
│   │   │   └── dashboardController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts               # JWT verification
│   │   ├── models/
│   │   │   ├── user.ts
│   │   │   ├── category.ts
│   │   │   ├── product.ts
│   │   │   └── order.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── userRoutes.ts
│   │   │   ├── categoryRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── orderRoutes.ts
│   │   │   └── dashboardRoutes.ts
│   │   ├── scripts/
│   │   │   └── createAdmin.ts        # Admin creation script
│   │   ├── app.ts                    # Express app setup
│   │   └── server.ts                 # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts                # API client
│   │   ├── context/
│   │   │   └── AuthContext.tsx       # Auth state management
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Users.tsx
│   │   │   ├── Categories.tsx
│   │   │   ├── Products.tsx
│   │   │   └── Orders.tsx
│   │   ├── App.tsx                   # Main app component
│   │   ├── App.css                   # Styles
│   │   ├── index.css
│   │   └── main.tsx                  # Entry point
│   ├── package.json
│   └── vite.config.ts
├── .env                              # Environment variables
└── README.md
```

## 🏗️ Building for Production

### Frontend Production Build

```bash
cd frontend
npm run build
```

Output: `frontend/dist/`

To preview the build:
```bash
npm run preview
```

### Backend Production Build

```bash
cd backend
npx tsc
```

Output: `backend/dist/`

To run production build:
```bash
node dist/server.js
```



## 🚦 Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/food-delivery-admin` | true |
| `JWT_SECRET` | Secret for JWT signing | - | true |
| `PORT` | Backend server port | `5000` | ❌ |
| `ADMIN_NAME` | Admin user name | `Admin` | ⚠️ |
| `ADMIN_EMAIL` | Admin email | `admin@example.com` | ⚠️ |
| `ADMIN_MOBILE` | Admin mobile | `1234567890` | ⚠️ |
| `ADMIN_PASSWORD` | Admin password | `admin123` | ⚠️ |

⚠️ = Required for `create-admin` script only
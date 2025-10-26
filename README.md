# Food Delivery Admin Panel

A full-stack admin panel for managing food delivery operations built with React.js, Node.js (Express), and MongoDB.

## Features

### Backend (Node.js + Express + MongoDB)
- RESTful API with complete CRUD operations
- MongoDB with Mongoose ODM
- Aggregation pipeline for dashboard analytics
- Collections: Users, Categories, Products, Orders

### Frontend (React.js + Vite)
- Modern React with TypeScript
- React Router for navigation
- Responsive design with clean UI
- Pages:
  - Dashboard with statistics
  - User Management
  - Category Management
  - Product Management
  - Order Creation

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, React Router
- **Backend**: Node.js, Express 5, TypeScript
- **Database**: MongoDB with Mongoose
- **Build Tools**: Vite, ts-node-dev

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn package manager

## Installation

### 1. Clone the repository

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

### 4. Set up MongoDB

Make sure MongoDB is running locally. The application will connect to:
```
mongodb://localhost:27017/food-delivery-admin
```

You can start MongoDB with:
```bash
mongod
```

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:3000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Products
- `GET /api/products` - List all products (with populated category)
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - List all orders

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics (aggregated data)

## Database Schema

### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  mobile: String (required),
  timestamps: true
}
```

### Categories Collection
```javascript
{
  name: String (required),
  description: String (required),
  timestamps: true
}
```

### Products Collection
```javascript
{
  name: String (required),
  categoryId: ObjectId (required, ref: Category),
  price: Number (required),
  status: String (required, default: "active"),
  timestamps: true
}
```

### Orders Collection
```javascript
{
  userId: ObjectId (required, ref: User),
  items: [{
    productId: ObjectId (required, ref: Product),
    quantity: Number (required),
    price: Number (required)
  }],
  totalAmount: Number (required),
  orderDate: Date (default: Date.now),
  timestamps: true
}
```

## Dashboard Aggregation

The dashboard uses MongoDB aggregation to calculate:
- Total number of users
- Total number of products
- Total number of orders
- Total revenue (sum of all order amounts)

## Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   ├── userController.ts
│   │   │   ├── categoryController.ts
│   │   │   ├── productController.ts
│   │   │   ├── orderController.ts
│   │   │   └── dashboardController.ts
│   │   ├── models/
│   │   │   ├── user.ts
│   │   │   ├── category.ts
│   │   │   ├── product.ts
│   │   │   └── order.ts
│   │   ├── routes/
│   │   │   ├── userRoutes.ts
│   │   │   ├── categoryRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── orderRoutes.ts
│   │   │   └── dashboardRoutes.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Users.tsx
│   │   │   ├── Categories.tsx
│   │   │   ├── Products.tsx
│   │   │   └── Orders.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── .env
└── README.md
```

## Usage Guide

### 1. Creating Categories
First, create some categories as they are needed for products:
1. Navigate to "Categories" in the sidebar
2. Fill in the category name and description
3. Click "Add" to create the category

### 2. Adding Products
After creating categories:
1. Navigate to "Products"
2. Fill in product details and select a category
3. Set the price and status
4. Click "Add" to create the product

### 3. Creating Users
1. Navigate to "Users"
2. Enter name, email, and mobile number
3. Click "Add" to create the user

### 4. Creating Orders
1. Navigate to "Orders"
2. Select a user from the dropdown
3. Add products by selecting them and specifying quantity
4. Review the total amount
5. Click "Create Order"

### 5. Viewing Dashboard
The dashboard displays real-time statistics including:
- Total users count
- Total products count
- Total orders count
- Total revenue

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

The production build will be created in `frontend/dist/`

### Backend Build
```bash
cd backend
npx tsc
```

## Environment Variables

The application uses a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/food-delivery-admin
```

## Features Implemented

- ✅ Complete CRUD operations for all entities
- ✅ MongoDB Aggregation Pipeline for dashboard
- ✅ Population of references (Category in Products, User and Products in Orders)
- ✅ Form validation and error handling
- ✅ Responsive UI with modern design
- ✅ Real-time data updates
- ✅ Clean code structure and organization
- ✅ TypeScript for type safety
- ✅ RESTful API design

## Troubleshooting

### MongoDB Connection Issues
If you see "MongoDB connection failed":
- Ensure MongoDB is running: `mongod`
- Check if port 27017 is available
- Verify the MONGO_URI in `.env` file

### Port Already in Use
If port 3000 or 5173 is already in use:
- Change the port in backend server.ts
- Update the API_BASE in frontend/src/api/api.ts

### CORS Issues
The backend is configured to accept requests from any origin. If you face CORS issues:
- Ensure the backend is running
- Check the CORS configuration in backend/src/app.ts

## License

MIT

## Author

Created as a Food Delivery Admin Panel assignment

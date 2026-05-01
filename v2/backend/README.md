# Hush & Co Backend API

RESTful API backend for Hush & Co e-commerce platform built with Express.js and MongoDB.

## Quick Start

```bash
npm install
npm start
```

Backend runs on: `http://localhost:5000`

## Environment Setup

Create a `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hushco
SESSION_SECRET=your_secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Features

- User authentication with session management
- Product management (CRUD operations)
- Order management and tracking
- User profile management
- Contact message system
- Admin dashboard access control

## API Routes

All routes prefixed with `/api`

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user profile

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)

### Users
- `GET /users/profile` - Get own profile
- `PUT /users/profile` - Update own profile
- `GET /users` - Get all users (admin only)
- `DELETE /users/:id` - Delete user (admin only)

### Orders
- `POST /orders` - Create new order
- `GET /orders` - Get user's orders
- `GET /orders/admin/all` - Get all orders (admin only)
- `PUT /orders/:id` - Update order status (admin only)

### Contact
- `POST /contact` - Submit contact message

## Database Models

### User
- username (unique)
- email (unique)
- password (hashed)
- firstName, lastName
- phone, address, city, state, zipCode, country
- role (user/admin)

### Product
- name, description
- price, category, sku
- stock, image, rating
- reviews array

### Order
- userId (reference to User)
- items (array of products)
- totalAmount, status
- shippingAddress, paymentMethod, trackingNumber

### Message
- name, email, subject, message
- status (unread/read/replied)

## Mock Data

The database is seeded automatically with:
- 3 test users (1 admin, 2 regular)
- 6 test products
- Sample contact messages

Test credentials:
- Admin: admin@example.com / admin123
- User: john@example.com / password123

## Middleware

- **CORS**: Configured to accept requests from frontend
- **Session**: Uses secure httpOnly cookies
- **Authentication**: Protects admin and user-specific routes
- **Error Handling**: Global error handling middleware

## Technology Stack

- **Node.js & Express** - Server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ORM
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **CORS** - Cross-origin resource sharing
- **MongoDB Memory Server** - In-memory database for dev

## Development

```bash
npm run dev
```

Uses nodemon for auto-restart on file changes.

## Project Structure

```
backend/
├── server.js              # Main server file
├── seeds.js               # Database seeding
├── models/                # Mongoose schemas
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Message.js
├── routes/                # API endpoints
│   ├── auth.js
│   ├── products.js
│   ├── users.js
│   ├── orders.js
│   └── contact.js
├── middleware/            # Custom middleware
│   └── auth.js
├── .env                   # Environment variables
└── package.json
```

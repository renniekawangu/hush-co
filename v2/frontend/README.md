# Hush & Co Frontend

Modern React frontend for Hush & Co e-commerce platform built with Vite and React Router.

## Quick Start

```bash
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

## Development

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
```

## Features

- User authentication (login/signup)
- Product browsing and filtering
- Shopping cart functionality
- User profile management
- Admin dashboard
- Contact form
- Responsive design

## Pages

- **Home** (`/`) - Landing page with features
- **Products** (`/products`) - Browse all products
- **Login** (`/login`) - User login
- **Signup** (`/signup`) - User registration
- **Profile** (`/profile`) - User profile (protected)
- **Admin** (`/admin`) - Admin dashboard (admin only)
- **Contact** (`/contact`) - Contact form

## Components

### Header
Main navigation component with:
- Logo and site name
- Navigation links
- User menu with logout
- Admin panel link for admin users

### Auth Components
- Login form with validation
- Signup form with password confirmation
- Protected routes

### Products
- Product grid display
- Product cards with details
- Add to cart functionality
- Filtering and search

## API Integration

All API calls through centralized `utils/api.js`:

```javascript
import { productAPI, authAPI, usersAPI } from '@/utils/api'

// Example usage
const products = await productAPI.getAll()
const user = await authAPI.login(credentials)
```

### API Utilities

- `authAPI` - Authentication endpoints
- `productsAPI` - Product management
- `usersAPI` - User profile
- `ordersAPI` - Order management
- `contactAPI` - Contact form

## Styling

Uses CSS Modules for component-scoped styling:
- `Header.module.css` - Header styles
- `Auth.module.css` - Auth pages styles
- `Products.module.css` - Products page styles
- `Home.module.css` - Home page styles
- `App.css` - Global styles

## Environment Setup

The frontend is configured to proxy API requests to the backend:

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

No separate `.env` file needed - API calls are proxied automatically.

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Products.jsx
│   │   ├── Contact.jsx
│   │   └── *.module.css
│   ├── utils/             # Utility functions
│   │   └── api.js         # Axios API client
│   ├── App.jsx            # Main app component
│   ├── App.css            # Global styles
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── package.json
└── .gitignore
```

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool for fast development
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS Modules** - Component-scoped styling

## Features

### Authentication
- User registration with validation
- Secure login
- Session management with httpOnly cookies
- Protected routes
- Auto-redirect on auth state changes

### Products
- Display all products from API
- Product cards with image, name, price, stock
- Add to cart button
- Product details view
- Category filtering (ready for implementation)

### User Features
- User profile page
- Update profile information
- View order history
- Change password

### Admin Features
- Admin dashboard
- Manage products (add, edit, delete)
- Manage users
- View and update orders
- Access control with role-based routing

## Performance Optimizations

- Vite for instant server start and fast HMR
- React lazy loading for code splitting
- CSS Modules for minimal CSS
- Axios request interceptors for error handling
- Efficient state management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API calls failing
- Ensure backend is running on port 5000
- Check CORS configuration in backend
- Verify proxy settings in `vite.config.js`

### Hot reload not working
- Clear Vite cache: `rm -rf node_modules/.vite`
- Restart dev server

### Build issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear browser cache

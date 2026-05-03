# Cravers Full-Stack Project

A full-stack food delivery web application with a customer-facing frontend, a Node.js and Express backend, and a MongoDB database. The backend code provided in this project handles user authentication, food item management, file uploads, and shopping cart operations using Mongoose models and JWT-based authentication.

## Overview

This project is designed as a food ordering platform where users can browse food items, register or log in, add items to a cart, and manage their shopping session. On the admin side, food items can be added with images, listed, and deleted through backend APIs.

## Full-Stack Architecture

### Frontend

The frontend is intended to be a customer-facing interface that connects with the backend APIs for authentication, menu browsing, and cart management. Based on the backend routes and controllers, the expected frontend modules include user authentication screens, a food listing page, cart page, and admin food management screens.

Typical frontend features:
- User signup and login forms.
- Food menu listing page using the food list API.
- Add to cart and remove from cart actions using protected cart endpoints.
- Admin form for adding food items with image upload.
- Food deletion option for admin management.

Suggested frontend stack:
- React.js
- Axios or Fetch API
- React Router
- Context API or Redux for cart and auth state
- Tailwind CSS, Bootstrap, or plain CSS

### Backend

The backend is built with Node.js, Express.js, MongoDB, and Mongoose. It provides APIs for user registration, login, food management, and cart functionality.

Backend responsibilities:
- Handle user registration and login with validation and hashed passwords.
- Generate JWT tokens for authenticated sessions.
- Add, list, and delete food items.
- Upload and store food images using Multer.
- Maintain cart data inside the user document.
- Connect to MongoDB using a dedicated database connection utility.

### Database

The project uses MongoDB as the primary database and Mongoose as the ODM layer. The current data model includes a `User` collection and a `Food` collection.

Database responsibilities:
- Store user credentials and cart data.
- Store food item details such as name, description, price, category, and image filename.
- Support CRUD operations through Mongoose models and controllers.

## Features

- User registration with email and password.
- User login with JWT token creation.
- Password hashing with bcrypt.
- Food item add, list, and delete APIs.
- Image upload support with Multer.
- Cart item add, remove, and fetch operations.
- MongoDB database integration using Mongoose.
- Authentication-protected cart routes.

## Project Flow

1. A user registers or logs in through the frontend.
2. The backend validates the request, hashes passwords during registration, and returns a JWT token in a cookie.
3. The frontend fetches available food items through the food list endpoint.
4. The user adds items to the cart through protected cart APIs.
5. Cart data is stored in the user's MongoDB document as an object of item IDs and quantities.
6. Admin users can add or remove food items, including image uploads stored on disk.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js or any JavaScript UI framework (suggested) |
| Backend | Node.js, Express.js. |
| Database | MongoDB with Mongoose. |
| Authentication | JWT, bcrypt. |
| File Upload | Multer. |

## Backend API Endpoints

### User APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/register` | Register a new user. |
| POST | `/api/user/login` | Login user and receive JWT token cookie.|

### Food APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/food/add` | Add a new food item with image upload. |
| GET | `/api/food/list` | Retrieve all food items. |
| POST | `/api/food/delete` | Delete a food item by id. |

### Cart APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/cart/add` | Add a food item to cart. |
| POST | `/api/cart/remove` | Remove a food item from cart. |
| GET | `/api/cart/items` | Fetch current cart items. |

## Database Schema

### User Schema

```js
{
  name: String,
  email: String,
  password: String,
  cartData: Object
}
```

The `User` document stores account details and an object-based cart structure where the keys are food item IDs and the values are quantities.

### Food Schema

```js
{
  name: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String
}
```

The `Food` document stores each menu item's data and the uploaded image filename.

## Folder Structure

```bash
.
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
├── backend/
│   ├── controllers/
│   │   ├── CartController.js
│   │   ├── FoodController.js
│   │   └── UserController.js
│   ├── routes/
│   │   ├── CartRoute.js
│   │   ├── FoodRoute.js
│   │   └── UserRoute.js
│   ├── models/
│   │   ├── FoodModel.js
│   │   └── UserModel.js
│   ├── config/
│   │   └── ConnectDb.js
│   ├── utils/
│   │   └── Multer.js
│   └── Uploads/
└── README.md
```

## Environment Variables

Create a `.env` file in the backend root:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

The backend reads `MONGODB_URL` for the MongoDB connection and `JWT_SECRET` for token generation.

## Installation

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Before starting the server, make sure:
- MongoDB connection string is added in `.env`.
- JWT secret is configured.
- `Uploads` directory exists for image storage.

### Frontend Setup

If the frontend is built with React:

```bash
cd frontend
npm install
npm run dev
```

The frontend should connect to the backend API base URL, for example:

```env
VITE_API_URL=http://localhost:5000/api
```

## Example Frontend Pages

Recommended frontend pages for this project:
- Home page with food listing
- Login page
- Register page
- Cart page
- Admin add food page
- Admin food list management page

These pages align with the backend features already implemented in the project.

## Future Improvements

- Add role-based admin authorization for food management.
- Add order placement and checkout functionality.
- Add payment gateway integration.
- Add user profile and order history pages.
- Store uploaded images in cloud storage instead of local disk.
- Improve API validation and error handling consistency.
- Add unit and integration tests.
- Add Swagger or Postman API documentation.

## Notes

The attached backend code shows a strong starting structure for a food delivery application, but some controller code appears to need cleanup and standardization before production deployment.The README therefore documents both the implemented backend and the intended frontend and database architecture for a complete full-stack version of the project.



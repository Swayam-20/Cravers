# Cravers Full-Stack Project

A full-stack food delivery web application with a customer-facing frontend, a Node.js and Express backend, and a MongoDB database. The backend code provided in this project handles user authentication, food item management, file uploads, and shopping cart operations using Mongoose models and JWT-based authentication.[file:198][file:199][file:200][file:201][file:202][file:203][file:204][file:205][file:206][file:207]

## Overview

This project is designed as a food ordering platform where users can browse food items, register or log in, add items to a cart, and manage their shopping session. On the admin side, food items can be added with images, listed, and deleted through backend APIs.[file:199][file:200][file:201][file:202][file:203][file:205][file:207]

## Full-Stack Architecture

### Frontend

The frontend is intended to be a customer-facing interface that connects with the backend APIs for authentication, menu browsing, and cart management. Based on the backend routes and controllers, the expected frontend modules include user authentication screens, a food listing page, cart page, and admin food management screens.[file:198][file:199][file:200][file:201][file:202][file:203]

Typical frontend features:
- User signup and login forms.[file:201][file:202]
- Food menu listing page using the food list API.[file:200][file:203]
- Add to cart and remove from cart actions using protected cart endpoints.[file:198][file:199]
- Admin form for adding food items with image upload.[file:200][file:203][file:206]
- Food deletion option for admin management.[file:200][file:203]

Suggested frontend stack:
- React.js
- Axios or Fetch API
- React Router
- Context API or Redux for cart and auth state
- Tailwind CSS, Bootstrap, or plain CSS

### Backend

The backend is built with Node.js, Express.js, MongoDB, and Mongoose. It provides APIs for user registration, login, food management, and cart functionality.[file:198][file:199][file:200][file:201][file:202][file:203][file:204]

Backend responsibilities:
- Handle user registration and login with validation and hashed passwords.[file:201][file:202]
- Generate JWT tokens for authenticated sessions.[file:202]
- Add, list, and delete food items.[file:200][file:203]
- Upload and store food images using Multer.[file:200][file:203][file:206]
- Maintain cart data inside the user document.[file:199][file:205]
- Connect to MongoDB using a dedicated database connection utility.[file:204]

### Database

The project uses MongoDB as the primary database and Mongoose as the ODM layer. The current data model includes a `User` collection and a `Food` collection.[file:204][file:205][file:207]

Database responsibilities:
- Store user credentials and cart data.[file:205]
- Store food item details such as name, description, price, category, and image filename.[file:207]
- Support CRUD operations through Mongoose models and controllers.[file:199][file:203][file:204][file:205][file:207]

## Features

- User registration with email and password.[file:201][file:202]
- User login with JWT token creation.[file:201][file:202]
- Password hashing with bcrypt.[file:202]
- Food item add, list, and delete APIs.[file:200][file:203]
- Image upload support with Multer.[file:200][file:203][file:206]
- Cart item add, remove, and fetch operations.[file:198][file:199]
- MongoDB database integration using Mongoose.[file:204][file:205][file:207]
- Authentication-protected cart routes.[file:198]

## Project Flow

1. A user registers or logs in through the frontend.[file:201][file:202]
2. The backend validates the request, hashes passwords during registration, and returns a JWT token in a cookie.[file:202]
3. The frontend fetches available food items through the food list endpoint.[file:200][file:203]
4. The user adds items to the cart through protected cart APIs.[file:198][file:199]
5. Cart data is stored in the user's MongoDB document as an object of item IDs and quantities.[file:199][file:205]
6. Admin users can add or remove food items, including image uploads stored on disk.[file:200][file:203][file:206]

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js or any JavaScript UI framework (suggested) |
| Backend | Node.js, Express.js.[file:198][file:200][file:201] |
| Database | MongoDB with Mongoose.[file:204][file:205][file:207] |
| Authentication | JWT, bcrypt.[file:202] |
| File Upload | Multer.[file:206] |

## Backend API Endpoints

### User APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/register` | Register a new user.[file:201][file:202] |
| POST | `/api/user/login` | Login user and receive JWT token cookie.[file:201][file:202] |

### Food APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/food/add` | Add a new food item with image upload.[file:200][file:203][file:206] |
| GET | `/api/food/list` | Retrieve all food items.[file:200][file:203] |
| POST | `/api/food/delete` | Delete a food item by id.[file:200][file:203] |

### Cart APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/cart/add` | Add a food item to cart.[file:198][file:199] |
| POST | `/api/cart/remove` | Remove a food item from cart.[file:198][file:199] |
| GET | `/api/cart/items` | Fetch current cart items.[file:198][file:199] |

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

The `User` document stores account details and an object-based cart structure where the keys are food item IDs and the values are quantities.[file:205]

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

The `Food` document stores each menu item's data and the uploaded image filename.[file:207]

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

The backend reads `MONGODB_URL` for the MongoDB connection and `JWT_SECRET` for token generation.[file:202][file:204]

## Installation

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Before starting the server, make sure:
- MongoDB connection string is added in `.env`.[file:204]
- JWT secret is configured.[file:202]
- `Uploads` directory exists for image storage.[file:206]

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

These pages align with the backend features already implemented in the project.[file:198][file:199][file:200][file:201][file:202][file:203]

## Future Improvements

- Add role-based admin authorization for food management.[file:205]
- Add order placement and checkout functionality.
- Add payment gateway integration.
- Add user profile and order history pages.
- Store uploaded images in cloud storage instead of local disk.
- Improve API validation and error handling consistency.[file:199][file:202][file:203][file:204]
- Add unit and integration tests.
- Add Swagger or Postman API documentation.

## Notes

The attached backend code shows a strong starting structure for a food delivery application, but some controller code appears to need cleanup and standardization before production deployment.[file:199][file:202][file:203][file:204] The README therefore documents both the implemented backend and the intended frontend and database architecture for a complete full-stack version of the project.[file:198][file:199][file:200][file:201][file:202][file:203][file:204][file:205][file:207]



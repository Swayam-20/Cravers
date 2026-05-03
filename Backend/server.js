import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDb from './src/db/ConnectDb.js';
import multer from './src/utils/Multer.js';
import FoodRoute from './src/routes/FoodRoute.js';
import UserRoute from './src/routes/UserRoute.js';
import CartRoute from './src/routes/CartRoute.js';
// load environment variables from config.env file
dotenv.config();

const app = express(); // initializing express app


app.use(cors(
    {
        // origin: process.env.Client_url, // allow requests from this origin
        // credentials: true // allow credentials (cookies, authorization headers, etc.)
    }
)) // using cors to allow cross-origin requests
ConnectDb() // connect to the database

app.use(express.json()) // middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: true })) // parse HTML forms & x-www-form-urlencoded

// If no body parser ran for this request, avoid "Cannot destructure ... of undefined"
app.use((req, _res, next) => {
    if (req.body === undefined) req.body = {};
    next();
});

app.use('/uploads',express.static('Uploads')) // serve static files from the 'Uploads' directory when the '/uploads' route is accessed


app.use("/api/food",FoodRoute)
app.use("/api/user",UserRoute) // use the UserRoute for routes starting with '/api/user'
app.use("/api/cart",CartRoute) // use the CartRoute for routes starting with '/api/cart'
app.get('/',(req,res)=>{
    res.send("Hello World")
}) // define a simple route for the root URL

const port = process.env.PORT || 5003; // get the port from environment variables or use 5003 as default

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})
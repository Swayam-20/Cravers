import mongoose from "mongoose";
import dotenv from "dotenv";
import {name as dbname} from "../../constant.js";
import { asynchandler } from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";

dotenv.config();
const ConnectDb= asynchandler(
    async()=>{
        try {
            const mongoUri = process.env.MONGODB_URL;
            if (!mongoUri || typeof mongoUri !== "string" || mongoUri.trim() === "") {
                throw new Error(
                    "Missing environment variable MONGODB_URI. Add it to your .env (e.g., MONGODB_URI=mongodb+srv://user:pass@cluster/db)."
                );
            }
            const connectioninstance=await mongoose.connect(mongoUri,{
                dbName:dbname,
            })
            console.log(`Database connected successfully \t ${connectioninstance.connection.host}/ db_name:${dbname}`)
        } catch (error) {
            console.log("Database connection failed",error)
            throw new ApiError("Database connection failed",500,error.message,error.stack)
        }
    }
)


export default ConnectDb;
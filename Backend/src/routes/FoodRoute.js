import { Router } from "express";

import { FoodAdd, foodlist ,fooditemdelete} from "../controllers/FoodController.js";
import upload from "../utils/Multer.js";


const FoodRoute=Router()
FoodRoute.route("/add").post(upload.single("image"),FoodAdd)
FoodRoute.route("/list").get(foodlist)
FoodRoute.route("/delete").post(fooditemdelete)
export default FoodRoute
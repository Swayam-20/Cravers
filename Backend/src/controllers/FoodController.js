import fs from "fs";
import FoodModel from "../models/FoodModel.js";
import { asynchandler } from "../utils/Asynchandler.js";
import Apiresponse from "../utils/Apiresponse.js";
import ApiError from "../utils/ApiError.js";


const FoodAdd=asynchandler(
    async(req,res)=>{
            if (!req.file) {
                throw new ApiError("Image file is required",400);
            }
            let image_filename=req.file.filename;
            const {name,description,price,category}=req.body || {};
            const food= new FoodModel({
                name:name,
                description:description,
                price:price,
                category:category,
                imageUrl:image_filename
            });
            try {
                
                await food.save();
                return res.status(200).json({
                    new_item : new Apiresponse(200,"Food added successfully",food)
                })
            } catch (error) {
                console.log("Failed to add food",error)
                throw new ApiError("Failed to add food",500,error.message,error.stack)
            }
    }
)
const foodlist=asynchandler(async(req,res)=>{
    try {
        const foods=await FoodModel.find({});
        if(foods.length===0){
            return res.status(200).json({
                foods : new Apiresponse(200,"No food items found",[])
            })
        }
        return res.status(200).json({
            foods : new Apiresponse(200,"Food list retrieved successfully",foods)
        })
    } catch (error) {
        console.log("Failed to retrieve food list",error)
        throw new ApiError("Failed to retrieve food list",500,error.message,error.stack)
    }
})
const fooditemdelete=asynchandler(async(req,res)=>{
    const id=req.body.id;
    
    try {
        const food = await FoodModel.findById(id);
        if (!food) {
            throw new ApiError("Food item not found",404);
        }

        if (food.imageUrl) {
            fs.unlink(`./Uploads/${food.imageUrl}`,()=>{});
        }

        await FoodModel.findByIdAndDelete(id);
        return res.status(200).json({
            message : new Apiresponse(200,"Food item deleted successfully",null)
        })
    } catch (error) {
        console.log("Failed to delete food item",error)
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError("Failed to delete food item",500,error.message,error.stack)
    }
})

export {
    FoodAdd,
    foodlist,
    fooditemdelete
}
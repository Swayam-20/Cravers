import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import Apiresponse from "../utils/Apiresponse.js";
import ApiError from "../utils/ApiError.js";
import { asynchandler } from "../utils/Asynchandler.js";



const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"7d",
    })
}
const registeruser = asynchandler(
    async (req, res) => {
        const { name, email, password } = req.body || {};
        console.log("Received registration data:", { name, email, password: password ? "******" : undefined });
        if (!name?.trim() || !email?.trim() || !password) {
            throw new ApiError(
                "All fields are required (name, email, password). Send JSON with Content-Type: application/json.",
                400
            );
        }
        const exist = await UserModel.findOne({ email: email });
        if(exist){
            return res.status(400).json(
                {
                    exist: new Apiresponse(400,"User already exists")
                }
                )
        }
        if (!validator.isEmail(email)) { // Validate email format
            return res.status(400).json(
                {
                    Invalid_email_format: new Apiresponse(400,"Invalid email format",null)
                }
            )
        }
        if(password.length<8){ // Validate password length
            return res.status(400).json(
                {
                    Weak_password: new Apiresponse(400,"Password must be at least 8 characters long",null)
                }
            )
        }   
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const user = new UserModel({
            name: name,
            email: email,
            password: hashedpassword,
        });
        const options = {
            httpOnly: true,
            secure: true
        };
        const cookie=generateToken(user._id);
        try {
            await user.save();
            
            const createdUser = await UserModel.findById(user._id).select("-password");
            return res
            .status(200)
            .cookie("token",cookie , options)
            .json(
                {
                    success:true,cookie
                }
            )
        } catch (error) {
            console.log("Failed to register user", error);
            throw new ApiError("Failed to register user", 500, error.message, error.stack);
        }
    }
)
const loginuser = asynchandler(async (req, res) => {
    const {email,password}=req.body || {};
    if(!email?.trim()||!password){
        throw new ApiError(
            "Both email and password are required. Send JSON with Content-Type: application/json.",
            400
        )
    }
    try {
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.status(400).json(
                {
                    not_found: new Apiresponse(400,"User not found")
                }
            )
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            
            return res.status(400).json(
                {
                    invalid_credentials: new Apiresponse(400,"Invalid credentials")
                }
            )
        }
        const options = {
            httpOnly: true,
            secure: true
        };
        const cookie=generateToken(user._id);

        return res
        .status(200)
        .cookie("token",cookie , options)
        .json(
            {
                success:true,cookie
            }
        )
    } catch (error) {
        throw new ApiError("Failed to login user", 500, error.message, error.stack);
    }
})

export {registeruser
    ,loginuser}
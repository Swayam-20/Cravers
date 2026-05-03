import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    // role:{
    //     type:String,
    //     enum:["user","admin"],
    //     default:"user",
    // },
    // Map of food item id (string) -> quantity
    cartData:{
        type: Object,
        default: {},
    }
},
{
    minimize:false,
})

const UserModel=mongoose.models.User||mongoose.model("User",UserSchema)
export default UserModel;
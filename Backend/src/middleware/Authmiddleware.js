import jwt from "jsonwebtoken";
import { asynchandler } from "../utils/Asynchandler.js";



const Authmiddleware=asynchandler(
    async(req,res,next)=>{
        const {token}=req.headers || {};
        if(!token){
            return res.status(401).json({
                error:"Unauthorized"
            })
        }
        try {
            const token_decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.body.userId=token_decoded.id;
            next();
        } catch (error) {
            console.log("Invalid token",error)
            return res.status(401).json({
                error:"Unauthorized"
            })
        }
    }
)
export default Authmiddleware;
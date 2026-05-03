import UserModel from "../models/UserModel.js";
import { asynchandler  }from "../utils/Asynchandler.js";
import Apiresponse from "../utils/Apiresponse.js";
import ApiError from "../utils/ApiError.js";

/** DB may have legacy [] default; cart must be a plain object */
const normalizeCart = (raw) => {
    if (!raw || Array.isArray(raw) || typeof raw !== "object") return {};
    return { ...raw };
};

// addtocart
const addtocart=asynchandler(async(req,res)=>{
    try {
        const userId=req.body.userId;
        const userdata = await UserModel.findById({_id:userId});
        if(!userdata){
            return res.status(404).json({
                error:"User not found"
            })
        }
        const cartData= normalizeCart(userdata.cartData);
        // console.log(cartData);
        const itemid=req.body._id;
        // console.log(itemid);
        if(!cartData[itemid]){
            cartData[itemid]=1;
        }
        else{
            cartData[itemid]+=1;
        }
        
        // console.log(cartData);
        await UserModel.findByIdAndUpdate({_id:userId},{cartData:cartData});
        res.json({
            addtocart:new Apiresponse(200,"Item added to cart successfully")
        })
    } catch (error) {
        throw new ApiError("Failed to add item to cart",500,error.message,error.stack);
    }

    

})


// removefromcart
const removefromcart=asynchandler(async(req,res)=>{
        const userId=req.body.userId;
        const userdata = await UserModel.findById({_id:userId});
        const itemid = req.body._id;
        
        try {
            if(!userdata){
                return res.status(404).json({
                    error:"User not found"
                })
            }
            const cartData= {...userdata.cartData};
            
            if(cartData[itemid]>0){
                cartData[itemid]-=1;
            }
            else{
                if(cartData[itemid]==0)
                delete cartData[itemid];
                else{
                    return res.status(400).json({
                        error:"Item not in cart"
                    })
                }

            }
            await UserModel.findByIdAndUpdate({_id:userId},{cartData:cartData});
            res.json({
                removefromcart:new Apiresponse(200,"Item removed from cart successfully")
            })
        } catch (error) {
            throw new ApiError("Failed to remove item from cart",500,error.message,error.stack);
        }

})


// getcartitems
const getcartitems=asynchandler(async(req,res)=>{
    const userId=req.body.userId;
    try {
        const userdata = await UserModel.findById({_id:userId});
        if(!userdata){
            return res.status(404).json({
                error:"User not found"
            })
        }
        const cartData= await userdata.cartData;
        // console.log(cartData);
        res.json({
            getcartitem:new Apiresponse(200,"Cart items fetched successfully",cartData)
        })
    } catch (error) {
        throw new ApiError("Failed to fetch cart items",500,error.message,error.stack);
    }
})

export {addtocart,removefromcart,getcartitems};

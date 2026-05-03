import {
    addtocart,
    getcartitems,
    removefromcart,
} from "../controllers/CartController.js";

import { Router } from "express";
import Authmiddleware from "../middleware/Authmiddleware.js";


const CartRoute = Router();

CartRoute.route("/add").post(Authmiddleware,addtocart);
CartRoute.route("/remove").post(Authmiddleware,removefromcart);
CartRoute.route("/items").get(Authmiddleware,getcartitems);

export default CartRoute;
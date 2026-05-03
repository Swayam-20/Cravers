import { Router } from "express";
import { registeruser
    ,loginuser  } from "../controllers/UserController.js";


const UserRouter= Router();

    UserRouter.route("/register").post(registeruser);
    UserRouter.route("/login").post(loginuser);

export default UserRouter;

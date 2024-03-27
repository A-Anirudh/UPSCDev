import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllUserDetails, getAllUsers, updateUserProfile } from "../controllers/adminAccountController.js";


const userAdminRoute = express.Router();
userAdminRoute.get('/all',protect,getAllUsers)
userAdminRoute.get('/:id',protect,getAllUserDetails)
userAdminRoute.put('/update',protect,updateUserProfile)



export default userAdminRoute;
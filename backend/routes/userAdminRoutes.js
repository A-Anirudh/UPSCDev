import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllUserDetails, getAllUsers, updateUserProfile } from "../controllers/adminAccountController.js";
import isAdmin from "../middleware/adminMiddleware.js";


const userAdminRoute = express.Router();
userAdminRoute.get('/all',protect,isAdmin,getAllUsers)
userAdminRoute.get('/:id',protect,isAdmin,getAllUserDetails)
userAdminRoute.put('/update',protect,isAdmin,updateUserProfile)

export default userAdminRoute;
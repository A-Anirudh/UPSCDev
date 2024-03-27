import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authAdmin, getAdminProfile, logoutAdmin, registerAdmin } from "../controllers/adminController.js";


const adminRoute = express.Router();

adminRoute.post('/', registerAdmin);
adminRoute.post('/auth', authAdmin);
adminRoute.post('/logout', logoutAdmin);
adminRoute.route('/profile').get(protect,getAdminProfile)

export default adminRoute;
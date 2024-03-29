import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendEverydayMail } from "../controllers/EmailController.js";
import isAdmin from "../middleware/adminMiddleware.js";

const emailRoute = express.Router();

emailRoute.route('/dailyUpdate').post(protect,isAdmin,sendEverydayMail)

export default emailRoute;
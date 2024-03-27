import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendEverydayMail } from "../controllers/EmailController.js";

const emailRoute = express.Router();

emailRoute.route('/dailyUpdate').post(protect,sendEverydayMail)

export default emailRoute;
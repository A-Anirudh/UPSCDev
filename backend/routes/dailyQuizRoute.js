import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getQuestion,addQuestion,getSolution } from "../controllers/dailyQuizController.js";
import isAdmin from '../middleware/adminMiddleware.js'

const DailyQuizRoute = express.Router();

DailyQuizRoute.route('/getQuestion').get(protect,getQuestion)
DailyQuizRoute.route('/getSolution').get(protect,getSolution)
DailyQuizRoute.route('/addQuestion').post(protect,isAdmin,addQuestion)

export default DailyQuizRoute;
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getQuestion,addQuestion,getSolution } from "../controllers/dailyQuizController.js";

const DailyQuizRoute = express.Router();

DailyQuizRoute.route('/getQuestion').get(protect,getQuestion)
DailyQuizRoute.route('/getSolution').get(protect,getSolution)
DailyQuizRoute.route('/addQuestion').post(protect,addQuestion)

export default DailyQuizRoute;
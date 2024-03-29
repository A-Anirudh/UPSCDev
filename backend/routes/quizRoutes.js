import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getQuestion,addQuestion,getSolutions, deleteQuestion, updateIndividualQuestion } from "../controllers/quizController.js";
import isAdmin from "../middleware/adminMiddleware.js";

const quizRoute = express.Router();

quizRoute.route('/getQuestion/:affairId').get(protect,getQuestion)
quizRoute.route('/getSolution/:affairId').get(protect,getSolutions)
quizRoute.route('/addQuestion').post(protect,isAdmin,addQuestion)
quizRoute.route('/deleteQuestion').delete(protect,isAdmin,deleteQuestion)
quizRoute.route('/updateQuestion').put(protect,isAdmin,updateIndividualQuestion)

export default quizRoute;
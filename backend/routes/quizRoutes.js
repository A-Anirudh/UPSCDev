import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getQuestion,addQuestion,getSolutions, deleteQuestion, updateIndividualQuestion } from "../controllers/quizController.js";

const quizRoute = express.Router();

quizRoute.route('/getQuestion/:affairId').get(protect,getQuestion)
quizRoute.route('/getSolution/:affairId').get(protect,getSolutions)
quizRoute.route('/addQuestion').post(protect,addQuestion)
quizRoute.route('/deleteQuestion').delete(protect,deleteQuestion)
quizRoute.route('/updateQuestion').put(protect,updateIndividualQuestion)

export default quizRoute;
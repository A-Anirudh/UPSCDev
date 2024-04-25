import express from "express";
import { protect } from "../../middleware/authMiddleware.js";
import { addQuestion, addSolution, checkAttempted, deleteQuestion, getQuestion, getSolution, leaderboard } from "../../controllers/gamify/weeklyQuizController.js";
import isAdmin from "../../middleware/adminMiddleware.js";


const weeklyQuestionsRoute = express.Router();

weeklyQuestionsRoute.get('/questions/all',protect, getQuestion);
weeklyQuestionsRoute.post('/questions/new', protect,isAdmin,addQuestion);
weeklyQuestionsRoute.delete('/questions/delete', protect,deleteQuestion);
weeklyQuestionsRoute.get('/questions/solutions', protect, getSolution);
weeklyQuestionsRoute.get('/questions/leaderboard', protect, leaderboard);
weeklyQuestionsRoute.get('/questions/checkAttempted', protect, checkAttempted);

weeklyQuestionsRoute.post('/solutions/new', protect,addSolution);


export default weeklyQuestionsRoute;
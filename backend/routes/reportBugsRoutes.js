import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addBug, allBugsForAdminPanel, markBugAsFixed } from "../controllers/reportBugsController.js";

const reportBugsRoute = express.Router();

reportBugsRoute.post('/add',protect, addBug);
reportBugsRoute.get('/all',protect,allBugsForAdminPanel);
reportBugsRoute.put('/update',protect,markBugAsFixed);

export default reportBugsRoute;
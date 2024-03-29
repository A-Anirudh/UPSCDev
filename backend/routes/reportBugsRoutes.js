import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addBug, allBugsForAdminPanel, markBugAsFixed } from "../controllers/reportBugsController.js";
import isAdmin from "../middleware/adminMiddleware.js";

const reportBugsRoute = express.Router();

reportBugsRoute.post('/add',protect, addBug);
reportBugsRoute.get('/all',protect, isAdmin,allBugsForAdminPanel);
reportBugsRoute.put('/update',protect,isAdmin,markBugAsFixed);

export default reportBugsRoute;
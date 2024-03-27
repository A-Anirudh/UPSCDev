import express from "express";
import { createBadge, deleteBadge, getAllBadges, getMultipleBadgesOfOneUser, updateBadge } from "../../controllers/gamify/badgeController.js";
import { protect } from "../../middleware/authMiddleware.js";

const badgeRoute = express.Router();

badgeRoute.get('/badge/all',protect, getAllBadges);
badgeRoute.get('/badge/user/all',protect, getMultipleBadgesOfOneUser);
badgeRoute.post('/badge/new', protect,createBadge);
badgeRoute.put('/badge/update', protect, updateBadge);
badgeRoute.delete('/badge/delete', protect, deleteBadge);


export default badgeRoute;
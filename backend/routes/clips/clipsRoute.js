import express from "express";
import { protect } from "../../middleware/authMiddleware.js";
import { createClip, deleteClip, getAllClipsOfAUser } from "../../controllers/clips/clipsController.js";

const ClipRoute = express.Router();

ClipRoute.route('/addClip').post(protect,createClip)
ClipRoute.route('/getAll').get(protect,getAllClipsOfAUser)
ClipRoute.route('/deleteClip').delete(protect,deleteClip)

export default ClipRoute;
import express from "express";
import { verifyEmail } from "../controllers/userController.js";

const verifyRoute = express.Router();

verifyRoute.get('/:id/verify/:token',verifyEmail);

export default verifyRoute;
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addFavourite, allMyFavourites, deleteFavourite } from "../controllers/favoriteController.js";

const favouriteRoute = express.Router();

favouriteRoute.post('/add',protect, addFavourite);
favouriteRoute.get('/all',protect,allMyFavourites);
favouriteRoute.delete('/delete',protect,deleteFavourite);

export default favouriteRoute;
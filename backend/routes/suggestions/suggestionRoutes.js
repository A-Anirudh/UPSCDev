import express from "express";
import { suggestionsForArticle } from "../../controllers/suggestions/suggestionsController.js";

const suggestionRoute = express.Router();

suggestionRoute.get('/get-suggestions', suggestionsForArticle);

export default suggestionRoute;
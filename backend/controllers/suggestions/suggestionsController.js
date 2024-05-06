import asyncHandler from "express-async-handler";
import { Affair } from "../../models/affairsModel.js";
import mongoose from "mongoose";

// GET request
// Public
// Query: currentArticleId
const suggestionsForArticle = asyncHandler(async (req, res) => {
    const { articleId } = req.query;

    // Validate articleId format
    if (!mongoose.isValidObjectId(articleId)) {
        return res.status(400).json({
            message: 'Invalid articleId format'
        });
    }

    try {
        const currentAffair = await Affair.findById(articleId);
        const suggestions = await Affair.find({ subject: currentAffair.subject, _id: { $ne: articleId } }).limit(5).select('id affairName pid');
        const latestArticles = await Affair.find({}).limit(5).sort({createdAt:-1}).select('id affairName pid');

        if (suggestions.length > 0 || latestArticles.length > 0) {
            return res.status(200).json({
                suggestions,
                latestArticles
            });
        } else {
            return res.status(404).json({
                message: "Articles not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

export { suggestionsForArticle };

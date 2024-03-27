import express from "express";
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, verifyEmail, checkSubscription, changeMailingListPreference, addArticleToContinueReading, deleteArticleFromContinueReading,  getContinueReading,forgotPassword,resetPassword, setUserActiveToFalse } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();
router.get('/checkSubscription',protect,checkSubscription)
router.put('/updatePreference',protect,changeMailingListPreference)
router.get('/users/:id/verify/:token',verifyEmail );
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/continueReading').post(protect,addArticleToContinueReading).delete(protect,deleteArticleFromContinueReading).get(protect,getContinueReading);

// Forgot password
router.post('/forgotPassword', forgotPassword);
router.post('/:id/reset/:token', resetPassword);

// Account inactive
router.get('/deleteAccount',protect,setUserActiveToFalse)

export default router;
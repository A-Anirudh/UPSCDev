import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { buySubscription, cancelSubscription, getRazorPayKey, getSubscriptionDetails, paymentVerification } from "../controllers/paymentController.js";

const paymentRoute = express.Router();
// BUY SUB
paymentRoute.route('/subscribe').get(protect,buySubscription)
// GET KEY
paymentRoute.route('/razorpaykey').get(getRazorPayKey)
// VERIFY PAYMENT AND SAVE TO DATABASE
paymentRoute.route('/verification').post(protect,paymentVerification)
paymentRoute.route('/paymentDetails').get(protect,getSubscriptionDetails)
paymentRoute.route('/cancel').delete(protect,cancelSubscription)


export default paymentRoute;
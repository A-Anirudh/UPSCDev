import User from '../models/userModel.js'
import { instance } from '../server.js';
import asyncHandler from "express-async-handler";
import crypto from 'crypto'
import Payment from '../models/paymentModel.js';


export const buySubscription = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user.role === 'admin'){
        res.status(400)
        throw new Error('Admin cannot buy subscriptions!!');
    }

    const plan_id = process.env.PLAN_ID || 'plan_NGXFWpSgHjjZQM	'
    const subscription = await instance.subscriptions.create({
        plan_id,
        customer_notify: 1,
        total_count: 12,

        notify_info:{
            notify_phone: user.phoneNumber,
            notify_email: user.email
          }

      });

      user.subscription.subId = subscription.id;
      user.subscription.status = subscription.status;
      await user.save();

      res.status(201).json({
        data:subscription.id
      })
    
})

export const paymentVerification = asyncHandler(async(req,res) => {
    const {razorpay_payment_id,razorpay_signature, razorpay_subscription_id} = req.body;
    const user = await User.findById(req.user._id);

    if(!user){
        res.status(404)
        throw new Error('User not found');
    }
    const subscription_id = user.subscription.subId;
    const generated_signature = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY).update(razorpay_payment_id+'|'+subscription_id,'utf-8').digest('hex');


    const isAuthentic = generated_signature === razorpay_signature;

    if(!isAuthentic){
        return res.redirect(`${process.env.BASE_URL}/paymentFailed`);
    }

    await Payment.create({
        razorpay_payment_id,razorpay_signature, razorpay_subscription_id
    })

    user.subscription.status='active';

    await user.save();

    res.redirect(`${process.env.BASE_URL}paymentSuccess?reference=${razorpay_payment_id}`);
    
})

export const getRazorPayKey = asyncHandler(async(req,res) =>{
    res.status(200).json({
        key:process.env.RAZORPAY_ID_KEY
    })
})


export const cancelSubscription = asyncHandler(async(req,res) =>{

    
    const user = await User.findById(req.user._id);
    const subscriptionId = user.subscription.subId;

    let refund = false;

    try {
        await instance.subscriptions.cancel(subscriptionId);
    } catch (error) {
            console.log("await",error)
    }



    // console.log('subscription cancelled!')
    const payment = await Payment.findOne({razorpay_subscription_id: subscriptionId});
    const gap = Date.now()-payment.createdAt;

    // console.log(gap)

    const refundTime = process.env.REFUND_DAYS*24*60*60*1000;
    // console.log(refundTime)

    if(refundTime>gap){
        // refund the money
        await instance.payments.refund(payment.razorpay_payment_id);
        refund = true;
        // console.log('refunded money!!')

    };

    payment.subscription_active = false;
    await payment.save();

    user.subscription.subId = undefined;
    user.subscription.status = undefined;

    await user.save();
    // console.log('reached the end')
    res.status(200).json({
        message: refund ?"Subscription cancelled successfully! You will receive the refund within 7 working days":"Subscription cancelled successfully! No refund initiated as subscription has been cancelled after 7 days"
    })
})

export const getSubscriptionDetails = asyncHandler(async(req,res) =>{
    const user = await User.findOne({_id:req.user._id});
    
    const details = await instance.subscriptions.fetch(user.subscription.subId)
    res.status(200).json({
        'message':details
    })
})
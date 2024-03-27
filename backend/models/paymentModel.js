import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    }, 
    razorpay_subscription_id:{
        type:String,
        required:true
    },
    subscription_active:{
        type:Boolean,
        default:true,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
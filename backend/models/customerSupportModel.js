import mongoose from "mongoose";

const customerSupport = mongoose.Schema({
    ticketNumber:{
        type:String,
        unique:true
    },
    title:{
        type:String
    },
    desc:{
        type:String
    },
    paymentRelated:{
        type:Boolean,
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    resolved:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }


});
const CustomerSupport = mongoose.model('CustomerSupport', customerSupport);

export {CustomerSupport};
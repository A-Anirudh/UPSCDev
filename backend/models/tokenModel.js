import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        unique:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:3600  // Delete in 1 hour
    }
})

const resetTokenSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        unique:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300  // Delete in 5mins
    }
})

const Token = mongoose.model('Token', tokenSchema);
const resetToken = mongoose.model('resetToken', resetTokenSchema);
export {Token,resetToken};
import mongoose from "mongoose";

const clipsSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    clipName:{
        type:String,
        required:true
    },
    affairId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Affair',
    },
    clip:{
        type:String
    },
    clipPosition:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

const Clip = mongoose.model('Clips', clipsSchema);
export {Clip};
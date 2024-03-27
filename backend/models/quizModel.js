import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question:{
        type:String
    },
    options:[{
        type:String,
    }],
    solution:{
        type:String
    },
    affairId : { type: mongoose.Schema.Types.ObjectId, ref: 'Affair' },

});
const Question = mongoose.model('Question', questionSchema);

export {Question};
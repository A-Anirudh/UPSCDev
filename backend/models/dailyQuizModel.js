import mongoose from "mongoose";

const dailyQuizSchema = mongoose.Schema({
    question:{
        type:String
    },
    options:[{
        type:String,
    }],
    solution:{
        type:String
    },
    subject:{
        type:String
    }
});
const DailyQuiz = mongoose.model('DailyQuiz', dailyQuizSchema);

export {DailyQuiz};
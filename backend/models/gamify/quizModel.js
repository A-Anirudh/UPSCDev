import mongoose from "mongoose";

const weeklyQuizSchema = mongoose.Schema({
    question:{
        type:String
    },
    options:[{
        type:String,
    }],
    solution:{
        type:String
    },
});


const weeklyQuizSolutionSchema = mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    question:{ type: mongoose.Schema.Types.ObjectId, ref: 'WeeklyQuiz' },
    solution:{
        type:String
    },
});

const WeeklyQuiz = mongoose.model('WeeklyQuiz', weeklyQuizSchema);
const weeklyQuizSolution = mongoose.model('weeklyQuizSolution', weeklyQuizSolutionSchema);

export {WeeklyQuiz,weeklyQuizSolution};
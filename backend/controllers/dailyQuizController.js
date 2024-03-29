import asyncHandler from "express-async-handler";
import { DailyQuiz } from "../models/dailyQuizModel.js";

const addQuestion = asyncHandler(async (req,res) => {
        const {question, options, solution,subject} = req.body;
        const result = await DailyQuiz.deleteMany({});

        const dailyQuizQuestion = await DailyQuiz.create({
            question,
            options,
            solution,
            subject
        })

        if(dailyQuizQuestion){
            res.status(201).json({
                message:"Question added successfully"
            })
        } else{
            res.status(503)
            throw new Error('Could not add question right now, please try again later')
        }
})

const getQuestion = asyncHandler(async (req,res) => {
        let questions
        if(req.user.role==='admin'){
            questions = await DailyQuiz.find({});

        } else{
            questions = await DailyQuiz.find({}).select('-solution');
        }
        if(questions.length>0){

            res.status(200).json({
                questions
            })
        } else{
            res.status(404)
            throw new Error('Quiz not found!')
        }
})

const getSolution = asyncHandler(async(req,res) => {
    const solutions = await DailyQuiz.find({}).select('solution');

    if(solutions){

        res.status(200).json({
            solutions
        })
    } else{
        res.status(404)
        throw new Error('Quiz not found!')
    }
})


export {getQuestion,addQuestion,getSolution}
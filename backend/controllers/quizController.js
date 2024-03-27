import asyncHandler from "express-async-handler";
import { Affair } from "../models/affairsModel.js";
import {Question} from "../models/quizModel.js";

const addQuestion = asyncHandler(async (req,res) => {
    if(req.user.role!='admin'){
        res.status(403).json({
            message:'You do not have the permission to access this route'
        })
    } else{
        

        const {questions} = req.body;
        let message = 0;

        for(let i=0;i<questions.length;i++){
            let affair = await Affair.findOne({_id:questions[i].affairId});
            if(affair){
                const q = await Question.create({
                    affairId:questions[i].affairId,
                    question:questions[i].question,
                    options:questions[i].options,
                    solution:questions[i].solution
                })
        
                if(q){
                    message+=1;

                } else{
                    return res.status(500).json({
                        "message":`Unable to add question number ${i+1}  currently. Please try again later`
                    })
                }
            } else{
                res.status(404);
                throw new Error("Affair does not exist!")
            }
    
        }

        res.status(200).json({
            "message":`${message} number of questions added!`
        })
    }
})

const getQuestion = asyncHandler(async (req,res) => {
    if(req.user.subscription.status!='active' ){
        res.status(403)
        throw new Error('Available only for premium users!')

    } else{
        const affairId = req.params.affairId;
        let questions
        if(req.user.role==='admin'){
            questions = await Question.find({affairId : affairId});

        } else{
            questions = await Question.find({affairId : affairId}).select('-solution');
        }
        if(questions){

            res.status(200).json({
                questions
            })
        } else{
            res.status(404).json({
                message:"Quiz not found for this article"
            })
        }
    }
})


const deleteQuestion = asyncHandler(async(req, res) => {
    if (req.user.role !== 'admin') {
        res.status(403)
        throw new Error('Permission denied')
    } else {
        const { questionId } = req.body;

        const result = await Question.deleteOne({ _id: questionId });

        if (result.deletedCount > 0) {
            res.status(200).json({
                message: "Question deleted successfully"
            });
        } else {
            res.status(404)
            throw new Error('Question not found!')
        }
    }
});


const getSolutions = asyncHandler(async(req,res) => {
    const affairId = req.params.affairId;
    const solutions = await Question.find({affairId : affairId}).select('solution');

    if(solutions){

        res.status(200).json({
            solutions
        })
    } else{
        res.status(404).json({
            message:"Quiz not found for this article"
        })
    }

})

const updateIndividualQuestion = asyncHandler(async (req, res) => {

    if (req.user.role !== 'admin') {
        res.status(403).json({
            message: 'You do not have the permission to access this route'
        });
    } else {

        const {questionId} = req.body;
        const q = await Question.findById(questionId);

        if(q){
            q.question = req.body.question || q.question;
            q.solution = req.body.solution || q.solution;        
            q.options = req.body.options || q.options;
            await q.save();
            res.status(200).json({
                message:"updated successfully!"
            })
        } else{
            res.status(404);
            throw new Error('Question not found')
        }
    }
});

export {getQuestion,addQuestion,getSolutions,deleteQuestion,updateIndividualQuestion}
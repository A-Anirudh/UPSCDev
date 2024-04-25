import asyncHandler from "express-async-handler";
import { WeeklyQuiz, weeklyQuizSolution} from "../../models/gamify/quizModel.js"
import NodeCache from "node-cache";
import User from '../../models/userModel.js'
import {Badge} from '../../models/gamify/badgesModel.js'


const nodeCache = new NodeCache();

const addQuestion = asyncHandler(async (req, res) => {
    const questionsData = req.body;

    // Validate if questionsData is an array
    if (!Array.isArray(questionsData)) {
        res.status(400);
        throw new Error('Questions data must be an array');
    }

    try {
        // Delete all existing documents from the WeeklyQuiz collection
        await WeeklyQuiz.deleteMany({});

        // Create an array of WeeklyQuiz documents from questionsData
        const questions = questionsData.map(({ question, options, solution, subject }) => ({
            question,
            options,
            solution,
            subject
        }));

        // Insert all questions at once
        const insertedQuestions = await WeeklyQuiz.insertMany(questions);

        if (insertedQuestions.length > 0) {
            nodeCache.del('allQuestionsWeekly');
            res.status(201).json({
                message: "Questions added successfully",
                questions: insertedQuestions
            });
        } else {
            res.status(503);
            throw new Error('Could not add questions right now, please try again later');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Error adding questions: ' + error.message);
    }
});




const getQuestion = asyncHandler(async (req,res) => {
        let questions
        if(req.user.role==='admin'){
            questions = await WeeklyQuiz.find({});
        } else{
            if(nodeCache.has('allQuestionsWeekly')){
                questions = JSON.parse(nodeCache.get('allQuestionsWeekly'));
            } else{
                // Check if user has already attempted quiz
                const solutions = await weeklyQuizSolution.find({ userId: req.user.id });   
                
                if(solutions.length>0){
                    return res.status(200).json({
                        attempted:true,
                        solutions
                    })
                } else{
                    questions = await WeeklyQuiz.find({}).select('-solution');
                    nodeCache.set('allQuestionsWeekly',JSON.stringify(questions));
                }


            }
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

    const solutions = await WeeklyQuiz.find({}).select('solution');

    if(solutions){
        res.status(200).json({
            solutions
        })
    } else{
        res.status(404)
        throw new Error('Quiz not found!')
    }
})

const deleteQuestion = asyncHandler(async(req, res) => {
    if (req.user.role !== 'admin') {
        res.status(403)
        throw new Error('Permission denied')
    } else {
        const { questionId } = req.body;

        const result = await WeeklyQuiz.deleteOne({ _id: questionId });

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

// Add the new QuizSchema and stuff
const addSolution = asyncHandler(async (req,res) => {
    const {solutions,correctAnswerCount,wrongAnswerCount} = req.body;
console.log("body",req.body)
    const user = await User.findOne({_id:req.user.id});

    if(user){
        const prevAnswer = await weeklyQuizSolution.find({user:req.user.id})
        if(prevAnswer.length>0){
            return res.status(200).json({
                alreadyAttempted:true,
                prevAnswer
            })
        }
        const result = await weeklyQuizSolution.insertMany(solutions);
        let newBadges;
        if(result){
            nodeCache.del('usersWithBadgesCache');
            let currentPoints = user.points;
            let newPoints;
            if(user.subscription.status === 'active'){
                newPoints = (2*correctAnswerCount - 1*wrongAnswerCount)*1.25;
            } else{
                newPoints = (2*correctAnswerCount - 1*wrongAnswerCount)
            }

            currentPoints += newPoints;
            user.points = currentPoints;
            const userBadgesArray = user.badges;

            const badges = await Badge.find({ pointsNeeded: { $lte: Number(currentPoints) } });
            // Identify badges that do not exist in userBadgesArray
            newBadges = badges.filter(badge => !userBadgesArray.some(userBadge => userBadge.equals(badge._id)));
            // Add new badges to userBadgesArray
            userBadgesArray.push(...newBadges.map(badge => badge._id));

            // Save the updated user object with the new badges
            user.badges = userBadgesArray;
            await user.save();
            nodeCache.del('allBadgesOfUser')
            res.status(200).json({alreadyAttempted:false,result, newBadges, currentPoints})
    
        } else{
            res.status(500)
            throw new Error('Internal Server Error')
        }

    } else{
        res.status(404)
        throw new Error('User not found!')
    }
});

const leaderboard = asyncHandler(async (req,res) => {
    let usersWithBadges;
    const users = await User.find({ role: 'user' }).select('username points id badges').sort({ points: -1 }).limit(100);
    const userRank = await User.countDocuments({ points: { $gt: req.user.points } }) + 1;

    // Using Promise.all to handle asynchronous operations
    if(nodeCache.has('usersWithBadgesCache')){
        usersWithBadges = JSON.parse(nodeCache.get('usersWithBadgesCache'));
    } else{
        usersWithBadges = await Promise.all(
            users.map(async user => {
              const badgeId = user.badges[user.badges.length - 1];
              const badge = await Badge.findOne({ _id: badgeId });    
              return {
                ...user.toObject(),
                badgeName: badge ? badge.badgeName : null,
                badgeURL: badge ? badge.imageURL : null
              };
            })
          );
          nodeCache.set('usersWithBadgesCache',JSON.stringify(usersWithBadges));
        //   Delete cache when solutions are added by users!
        
    }

    const userBadgeName = await Badge.findOne({_id:req.user.badges[req.user.badges.length-1]});

  
    if(users.length>0){
        res.status(200).json({
            usersWithBadges,
            userRank,
            userPoints:req.user.points,
            userBadgeName
        })
    } else{
        res.status(404)
        throw new Error('No users found!')
    }
})

const checkAttempted = asyncHandler(async (req,res) => {
    const prevAnswer = await weeklyQuizSolution.find({user:req.user.id})
    if(prevAnswer.length>0){
        return res.status(200).json({
            alreadyAttempted:true,
            prevAnswer
        })
    } else{
        return res.status(200).json({
            alreadyAttempted:false
        })
    }
})

// Clear weeklyQuizSolutions every week
// ! Tomorrow do this

// const badgeData = [
//     { "badgeName": "Novice 1", "pointsNeeded": 0 },
//     { "badgeName": "Novice 2", "pointsNeeded": 350 },
//     { "badgeName": "Novice 3", "pointsNeeded": 600 },
//     { "badgeName": "Aspirant 1", "pointsNeeded": 1000 },
//     { "badgeName": "Aspirant 2", "pointsNeeded": 1500 },
//     { "badgeName": "Aspirant 3", "pointsNeeded": 2200 },
//     { "badgeName": "Emerging 1", "pointsNeeded": 2500 },
//     { "badgeName": "Emerging 2", "pointsNeeded": 3000 },
//     { "badgeName": "Emerging 3", "pointsNeeded": 4000 },
//     { "badgeName": "Advancing 1", "pointsNeeded": 4800 },
//     { "badgeName": "Advancing 2", "pointsNeeded": 5500 },
//     { "badgeName": "Advancing 3", "pointsNeeded": 6400 },
//     { "badgeName": "Dedicated 1", "pointsNeeded": 7200 },
//     { "badgeName": "Dedicated 2", "pointsNeeded": 8000 },
//     { "badgeName": "Dedicated 3", "pointsNeeded": 9000 },
//     { "badgeName": "Enthusiast 1", "pointsNeeded": 10500 },
//     { "badgeName": "Enthusiast 2", "pointsNeeded": 12000 },
//     { "badgeName": "Enthusiast 3", "pointsNeeded": 13500 },
//     { "badgeName": "Active 1", "pointsNeeded": 15500 },
//     { "badgeName": "Active 2", "pointsNeeded": 17500 },
//     { "badgeName": "Active 3", "pointsNeeded": 18250 },
//     { "badgeName": "Promising 1", "pointsNeeded": 21500 },
//     { "badgeName": "Promising 2", "pointsNeeded": 23500 },
//     { "badgeName": "Promising 3", "pointsNeeded": 26000 }
//   ]
  
  
  
// Badge.insertMany(badgeData)
//   .then((result) => {
//     console.log(`${result.length} badges added to the collection`);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error('Error adding badges to the collection:', err);
//     mongoose.connection.close();
//   });

  
export {getQuestion,addQuestion,getSolution,addSolution,deleteQuestion,leaderboard,checkAttempted}
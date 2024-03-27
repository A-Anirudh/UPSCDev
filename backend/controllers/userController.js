import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import {generateToken} from '../utils/generateToken.js'
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import {Token, resetToken} from '../models/tokenModel.js'
import sendEmail from '../utils/sendMail.js'
import crypto from 'crypto'
import { accountDeleteEmailText, resetPasswordText, verifyUserText } from "../data/emailText.js";



dotenv.config();
// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  });

// const imagePath = './images/Female/Group-9.png';

// cloudinary.uploader.upload(imagePath, (error, result) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log(result);
//     }
//   });


// const getFirst20Images = async () => {
//     try {
//       const result = await cloudinary.api.resources({
//         type: 'upload',
//         max_results: 20,
//       });
  
//       result.resources.forEach(image => {
//         console.log(image);
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   getFirst20Images();


/**
 * @desc Auth user/set token
* @route  POST to /api/users/auth
* @Access Public
*/
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(user && (await user.matchPasswords(password))){

        if(!user.verified){
            let token = await Token.findOne({userId:user._id});
            if(!token){
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save() 
                return res.status(400).json({
                    message:"New email sent to your address, please verify to continue!"
                })
            }
            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`
            const details = verifyUserText(url)
            
            await sendEmail(user.email, details.subject,details.text)
            res.status(400).json({
                message:"Email has been sent to your account now, please verify to login"
            })
        } else{
            let notActiveLogin = false;
            if(user.active === false){
                console.log('Active was false')
                user.active = true;
                await user.save();
                console.log('Active is true')
                notActiveLogin = true;
            }
            await generateToken(res, user._id);
            console.log("cookie isss",req.cookies.jwt);
            return res.status(201).json({
                pid:user.pid,
                username: user.username,
                email:user.email,
                phoneNumber:user.phoneNumber,
                notActiveLogin,
                id:user.id,
            });

        }
 

    } else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
});

/**
 * @desc Register a new user
 * @route POST to /api/users
 * @access Public
 */

const registerUser = asyncHandler(async (req, res) => {
    const {username,email,password, phoneNumber, dateOfBirth, gender,avatarUrl,avatarPublicId} = req.body;
    const userExists = await User.findOne({email});


    
    if (phoneNumber.length !==10){
        res.status(400);
        throw new Error("Phone number should be only 10 digits. Do no include country code!")
    }

    if(userExists){
        res.status(400);
        throw new Error('user already exists!');
        // Uses our error handler that we created
    }


    const user = await User.create({
        pid:uuidv4(),
        username,
        email,
        password,
        phoneNumber,
        dateOfBirth, 
        gender: gender.charAt(0).toUpperCase() + gender.slice(1),
        avatar: {
            public_id:avatarPublicId,
            url: avatarUrl
        }
    });
    if(user){
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save()

        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`

        // Fetching text and subject from data folder
        const details = verifyUserText(url)

        // Sending email for verification
        await sendEmail(user.email, details.subject,details.text)
        // generateToken(res, user._id);
        res.status(201).json({
            message: "Email has been sent to your account, please verify to proceed",
        });
    } else{
        res.status(400);
        throw new Error('Invalid user data!')
    }
});

const verifyEmail = asyncHandler(async (req, res) => {
    
    const user = await User.findOne({_id:req.params.id});
    

    if(!user){
        return res.status(400).json({
            message:"User not valid"
        })
    }
    console.log(user)
    const userId = user._id;
    const reqToken = req.params.token;
    // console.log(req.params.token)


    const token = await Token.findOne({userId:userId,token:reqToken})
    // console.log(allTokens)
    // console.log(token)

    if(!token){
        return res.status(400).json({
            message:"Invalid link"
        })
    }

    // await User.findOneAndUpdate({_id:user._id},{verified:true});
    user.verified = true;
    await user.save();

    if(user.verified !==true){
        return console.log('user not set to true verified!!!',user.email)
    }
    await token.deleteOne();
    // console.log('email verified')
    res.status(200).json({
        message:"Account verified !"
    })
});

/**
 * @desc Logout
 * @route POST to  /api/users/logout
 * @access Public
 */

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"User logged out"})

});


const forgotPassword = asyncHandler(async (req,res) => {
        const {email} = req.body;
        const user = await User.findOne({email:email}).select('email');

        if(user){
            const rT = crypto.randomBytes(32).toString("hex");
            const hashedToken = crypto.createHash('sha256').update(rT).digest('hex');

            const exisistingToken = await resetToken.findOne({userId:user._id})
            if(exisistingToken){
                return res.status(200).json({
                    message:'Email already sent!'
                })
            }
            const token = await resetToken.create({
                userId: user._id,
                token:hashedToken
            })

            if(token){
                const url = `${process.env.BASE_URL}users/${user._id}/reset/${rT}`
                const details = resetPasswordText(url)
                const text = details.text
                const subject = details.subject
                await sendEmail(user.email, subject,text)
                res.status(201).json({
                    message:"Email sent",
                });

            } else{
                res.status(500)
                throw new Error('Internal Server Error!')
            }
        } else{
            res.status(404)
            throw new Error('Account does not exist!')
        }
});

const resetPassword = asyncHandler(async (req,res) => {
    const token = req.params.token;
    const userId = req.params.id
    const {newPassword} = req.body;

    const user = await User.findOne({_id:userId});

    if(!user){
        return res.status(400).json({
            message:"User not valid"
        })
    }

    const hashedTokenFromURL = crypto.createHash('sha256').update(token).digest('hex');
    const storedHashToken = await resetToken.findOne({userId:userId});

    if(storedHashToken.token !== hashedTokenFromURL){
        return res.status(401).json({
            message:'invalid token!'
        })
    }
    user.password = newPassword;
    await user.save();
    await resetToken.deleteOne({ userId: userId });

    res.status(200).json({
        message:"password reset successfully!"
    })



});

/**
 * @desc get user profile
 * @route GET to /api/users/profile
 * @route GET to /api/users/profile/android
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    // console.log(req.user)
    const user = {
        pid :req.user.pid,
        username:req.user.username,
        email :req.user.email,
        phoneNumber:req.user.phoneNumber,
        dateOfBirth: req.user.dateOfBirth,
        gender:req.user.gender,
        avatar:req.user.avatar,
        mailingList:req.user.mailingList,
        subscription:req.user.subscription
    }
    res.status(200).json({
        user
    })
});

/**
 * @desc Update User Profile
 * @route PUT to /api/users/profile
 * @access Private
 */

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.username = req.body.username || user.username;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;        
        user.email = req.body.email || user.email;
        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
        if (req.body.avatarUrl) {
            user.avatar.url = req.body.avatarUrl;
            user.avatar.public_id = req.body.avatarPublicId;
        }
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            pid:updatedUser.pid,
            username:updatedUser.username,
            email:updatedUser.email
        })
    } else{
        res.status(404);
        throw new Error('User not found')
    }
});

const checkSubscription = asyncHandler(async (req, res) => {
    const subscriptionStatus = req.user.subscription.status
    if(subscriptionStatus==='active'){
        return res.status(200).json({
            "data":true
        })
    } else{
        return res.status(200).json({
            "data":false
        })
    }
    
});

// change mailing list preference

const changeMailingListPreference = asyncHandler(async (req, res) => {
    const {newPreference} =req.body;

    // preference should be boolean
    const user = await User.findOne({pid:req.user.pid});


    user.mailingList = newPreference;
    await user.save();
    res.status(200).json({
        'message':"Successfuly updated your preferences"
    })
});

const addArticleToContinueReading = asyncHandler(async (req, res) => {

    if(req.user.subscription.status!='active'){
        res.status(200).json({"message":'available only for pro members'})

    } else{
        const user = await User.findOne({pid:req.user.pid});
        const {articleId,continueFrom} = req.body;

        if(req.user.subscription.status === 'active'){
                // Delete the one he is trying to add
        for(let i=0;i<user.continueReading.length;i++){
            if(user.continueReading[i].article==articleId){
                user.continueReading.splice(i,1);
            }
        }

        // Add to the front of the list
        user.continueReading.unshift({
            article:articleId,
            continueFrom
        })

        await user.save();
        res.status(200).json({
            'message':"Successfuly updated",
        })
        } else{
            res.status(200).json({
                message:'Buy subscription to activate this feature!'
            })
        }
    }
});

const deleteArticleFromContinueReading = asyncHandler(async (req, res) => {
    const user = await User.findOne({pid:req.user.pid});
    const {articleId} = req.body;
    
    // Delete the one he is trying to delete
    for(let i=0;i<user.continueReading.length;i++){
        if(user.continueReading[i].article==articleId){
            user.continueReading.splice(i);
        }
    }

    await user.save();
    res.status(200).json({
        'message':"Successfuly deleted from the list",
    })
});

const getContinueReading = asyncHandler(async (req, res) => {
    if(req.user.subscription.status!='active'){
        res.status(200).json({"message":'available only for pro members'})

    } else{
        const user = await User.findOne({ pid: req.user.pid }).select('continueReading');

        res.status(200).json({
            "data": user
        });
    }
});

const setUserActiveToFalse = asyncHandler(async (req,res) =>{
  // Set active to false and update deactivatedAt to the current date and time
  const updatedUser = await User.findByIdAndUpdate(req.user._id,{ active: false, deactivatedAt: new Date() },{ new: true });
  if (!updatedUser) {
        res.status(404)
        throw new Error('User not found!')
      }

    // Fetch details from data folder
      const details = accountDeleteEmailText(req.user.username,process.env.BASE_URL)
      const subject = details.subject
      const text = details.text
      sendEmail(req.user.email, subject,text)
    res.status(200).json({ message: 'Account deactivated successfully!' });
})


export {authUser, registerUser, logoutUser, forgotPassword, resetPassword,getUserProfile, updateUserProfile,verifyEmail,checkSubscription,changeMailingListPreference,addArticleToContinueReading,deleteArticleFromContinueReading,getContinueReading,setUserActiveToFalse};
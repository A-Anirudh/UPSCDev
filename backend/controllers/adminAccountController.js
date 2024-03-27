import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'

const getAllUsers = asyncHandler(async (req,res) => {
    if(req.user.role!='admin'){
        res.status(403)
        throw new Error('Forbidden route!')
    } else{
        const allUsers = await User.find({role:'user'}).select('username email id pid subscription')
        if(allUsers.length >0 ){
            return res.status(200).json({
                data:allUsers
            })
        }
        res.status(404)
        throw new Error('No users found')
    }

})

const getAllUserDetails = asyncHandler(async (req,res) => {
    if(req.user.role!='admin'){
        res.status(403)
        throw new Error('Forbidden route!')
    } else{
        const userId = req.params.id;
        const user = await User.findOne({_id:userId}).select('-continueReading')
        if(user){
            res.status(201).json({
                data:user
            })
        } else{
            res.status(404)
            throw new Error('User not found!')
        }
    }

})

/**
 * @desc Update User Profile
 * @route PUT to /api/users/profile
 * @access Private
 */

const updateUserProfile = asyncHandler(async (req, res) => {
    if(req.user.role!='admin'){
        res.status(403)
        throw new Error('Forbidden route!')
    } else{
        const {userId} = req.body
        const user = await User.findById(userId)
    
        if(user){
            user.username = req.body.username || user.username;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;        
            user.email = req.body.email || user.email;
            user.gender = req.body.gender || user.gender;
            user.verified = req.body.verified || user.verified;
            user.mailingList = req.body.mailingList || user.mailingList;
            user.points = req.body.points || user.points;
            if(req.body.active){
                user.active = req.body.active;
                user.deactivatedAt = new Date.now()
            }
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
    
    }
});


export {getAllUsers,getAllUserDetails,updateUserProfile};
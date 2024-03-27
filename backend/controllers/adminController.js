import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import {generateToken} from '../utils/generateToken.js'
import { v4 as uuidv4 } from 'uuid';


const authAdmin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const admin = await User.findOne({email})
    if(admin && (await admin.matchPasswords(password))){
        generateToken(res, admin._id);
        return res.status(201).json({
            pid:admin.pid,
            email:admin.email,
        });
    } else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
});


const registerAdmin = asyncHandler(async (req, res) => {
    const {email,password,phoneNumber,dateOfBirth,gender,username} = req.body;
    const adminExists = await User.findOne({email});

    if(adminExists){
        res.status(400);
        throw new Error('Admin already exists!');
    }

    const admin = await User.create({
        pid:uuidv4(),
        email,
        username,
        password,
        phoneNumber,
        role:"admin",
        dateOfBirth,
        gender: gender.charAt(0).toUpperCase() + gender.slice(1),

    });
    if(admin){
        generateToken(res, admin._id);
        res.status(201).json({
            pid:admin.pid,
            email:admin.email,
        });
    } else{
        res.status(400);
        throw new Error('Invalid admin data!')
    }
});


const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"Admin logged out"})

});


const getAdminProfile = asyncHandler(async (req, res) => {
    const admin = {
        pid :req.user.pid,
        username:req.user.username,
        email :req.user.email,
        phoneNumber:req.user.phoneNumber,
        dateOfBirth: req.user.dateOfBirth,
        gender:req.user.gender,
    }
    res.status(200).json(admin)
});


export {authAdmin, registerAdmin, logoutAdmin, getAdminProfile};


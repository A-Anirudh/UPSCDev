import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import sendEmail from '../utils/sendMail.js'

// daily mail

const sendEverydayMail = asyncHandler(async (req, res) => {
    const {html} = req.body;
    if(req.user.role!='admin'){
        // Only admins can send email
        res.status(400)
        throw new Error('Access denied')
    } else{
        const allUsers = await User.find({})
        for(let i=0;i<allUsers.length;i++){
            if(allUsers[i].mailingList && allUsers[i].role!=='admin'){
                // send only to those who have mailingList as true, if they opt out, don't send email!
                sendEmail(allUsers[i].email,'Your daily update is here!',html)
                // console.log(`mail sent to ${allUsers[i].email}`)
            }
        }

        res.status(200).json({message:"All emails sent"})
    }
});

export {sendEverydayMail}
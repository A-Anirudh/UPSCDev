import { CustomerSupport } from "../models/customerSupportModel.js";
import asyncHandler from "express-async-handler";
import sendEmail from "../utils/sendMail.js";
import { customerSupportAddEmailText, customerSupportAddToSelfEmailText } from "../data/emailText.js";

// POST request with complaint and image_link from frontend
const addCustomerSupport = asyncHandler(async (req, res) => {
    const {ticketNumber,title,desc,paymentRelated} = req.body;
        const bug = await CustomerSupport.create({
            ticketNumber,
            title,
            desc,
            paymentRelated,
            userId:req.user._id,
            resolved:false
            });
        if(bug){
            const details = customerSupportAddEmailText(title,ticketNumber)
            const subject= details.subject
            const text = details.text

            // Email to user
            sendEmail(req.user.email,subject,text)
            
            const emailDetailsForSelf = customerSupportAddToSelfEmailText(paymentRelated,req.user.username,title)

            // Email to self
            sendEmail(process.env.EMAIL,emailDetailsForSelf.subject,emailDetailsForSelf.text )


            res.status(201).json({
            "message":"Query raised successfully! We will get back to you within 3 working days!"
            });
        } else{
            res.status(400);
            throw new Error('Invalid data entered!')
        }
});

// GET request
const allSupportForAdminPanel = asyncHandler(async (req,res) => {

    if(req.user.role!='admin'){
        res.status(400)
        throw new Error('Access denied')
    } else{
        const allBugs = await CustomerSupport.find({});
        if(allBugs.length>0){
            res.status(200).json({
                allBugs
            })
        } else{
            res.status(404)
            throw new Error('No support requests yet!')        
        }
    }
})

// PUT request with bugId as input from frontend
const markAsResolved = asyncHandler(async (req,res) => {
        const {complaintId} = req.body;
        const complaint = await CustomerSupport.findOne({_id:complaintId});
        if(complaint){
            complaint.resolved = true;
            await complaint.save();
            res.status(201).json({
                message: "Marked as resolved",
                complaint
            });
        } else{
            res.status(404)
            throw new Error('Complaint not found!')
        }
})

const deleteOldSupportQueries = asyncHandler(async (req, res) => {
        const { complaintIdArray } = req.body;

        // Get the current date and calculate 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Update the query to include the conditions for deletion
        const result = await CustomerSupport.deleteMany({
            _id: { $in: complaintIdArray },
            resolved: true,
            createdAt: { $lt: thirtyDaysAgo },
        });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: `Deleted ${result.deletedCount} documents successfully` });
        } else {
            res.status(500)
            throw new Error('Unable to delete document!')
        }
});

export {addCustomerSupport,allSupportForAdminPanel,markAsResolved,deleteOldSupportQueries}
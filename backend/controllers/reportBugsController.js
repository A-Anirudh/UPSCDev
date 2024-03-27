import { ReportBug } from '../models/reportBugsModel.js';
import asyncHandler from "express-async-handler";

// POST request with complaint and image_link from frontend
const addBug = asyncHandler(async (req, res) => {

        const bug = await ReportBug.create({
            reportedBy: req.user._id || undefined,
            complaint:req.body.complaint,
            image_link:req.body.image_link,
            status:'Active'
        });
        if(bug){
            res.status(201).json({
            "message":"Bug reported successfully! We will look into it and fix it as soon as possible"
            });
        } else{
            res.status(400);
            throw new Error('Invalid data entered!')
        }
});

// GET request
const allBugsForAdminPanel = asyncHandler(async (req,res) => {

    if(req.user.role!='admin'){
        res.status(400)
        throw new Error('Access denied')
    } else{
        const allBugs = await ReportBug.find({});
        if(allBugs.length>0){
            res.status(200).json({
                allBugs
            })
        } else{
            res.status(404)
            throw new Error('No bugs reported yet!')        
        }
    }
})

// PUT request with bugId as input from frontend
const markBugAsFixed = asyncHandler(async (req,res) => {

    if(req.user.role!='admin'){
        res.status(400)
        throw new Error('Access denied')
    }
    else{
        const {bugId} = req.body;
        const bug = await ReportBug.findOne({_id:bugId});
        if(bug){
            bug.status='Fixed'
            await bug.save();
            res.status(201).json({
                message: "Marked as fixed",
                bug
            });
        } else{
            res.status(404)
            throw new Error('Bug not found!')
        }
    }
})

const deleteOldBugReports = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        res.status(400);
        throw new Error('Access denied');
    } else {
        const { complaintIdArray } = req.body;

        // Get the current date and calculate 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Update the query to include the conditions for deletion
        const result = await ReportBug.deleteMany({
            _id: { $in: complaintIdArray },
            status: 'Fixed',
            createdAt: { $lt: thirtyDaysAgo },
        });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: `Deleted ${result.deletedCount} documents successfully` });
        } else {
            res.status(500).json({ error: 'Failed to delete documents' });
        }
    }
});

export {addBug,allBugsForAdminPanel,markBugAsFixed,deleteOldBugReports}
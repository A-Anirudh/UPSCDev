import asyncHandler from "express-async-handler";
import NodeCache from "node-cache";
import { Clip } from "../../models/clips/clipsModel.js";

const nodeCache = new NodeCache();

// GET REQUEST, PROTECTED ROUTE

const getAllClipsOfAUser = asyncHandler(async(req,res) => {

    const allClips = await Clip.find({userId:req.user.id});

    if(allClips.length >0){
        res.status(200).json({
            data:allClips
        })
    } else{
        res.status(200).json({
            data:[]
        })
    }
})

// POST REQUEST, PROTECTED ROUTE
const createClip = asyncHandler(async (req,res) => {
        const {affairId, clip,clipName,clipPosition} = req.body;

            const newClip = await Clip.create({
                userId: req.user.id,
                affairId,
                clip,
                clipName,
                clipPosition
            })
            if(newClip){
                res.status(200).json({
                    "message":`Clip created!`
                })
            }else{
                res.status(500)
                throw new Error('Unable to create now!')
            }
        
})

// DELETE REQUEST, PROTECTED ROUTE
const deleteClip = asyncHandler(async(req,res) => {
    const {clipId}= req.body;
    const result = await Clip.deleteOne({_id:clipId});
    if(result.deletedCount >0){
        res.status(201).json({
            message: "deleted successfully"
        });
    } else{
        res.status(404).json({
            message: 'Clip not found!'
        });
    }

})

export {getAllClipsOfAUser,createClip,deleteClip}
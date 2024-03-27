import asyncHandler from "express-async-handler";
import { Badge } from "../../models/gamify/badgesModel.js";
import NodeCache from "node-cache";


const nodeCache = new NodeCache();

const createBadge = asyncHandler(async (req,res) => {
    if(req.user.role!='admin'){
        res.status(403)
        throw new Error('permission denied')
    } else{
        const {badgeName, pointsNeeded, imageURL} = req.body;
        const newBadge = await Badge.create({
            badgeName, pointsNeeded, imageURL
        })

        if(newBadge){
            nodeCache.del('allBadges')
            res.status(201).json({
                message:"Badge added successfully"
            })
        } else{
            res.status(503)
            throw new Error('Could not add badge right now, please try again later')
        }

    }
})

const getAllBadges = asyncHandler(async(req,res) => {
    if(req.user.role!='admin'){
        res.status(403)
        throw new Error('permission denied')
    } else{
        let allBadges;
        if(nodeCache.has('allBadges')){
            allBadges = JSON.parse(nodeCache.get('allBadges'));
        } else{
            allBadges = await Badge.find({});
            nodeCache.set('allBadges',JSON.stringify(allBadges));

        }
        if(allBadges.length>0){
            res.status(200).json({
                data:allBadges
            })
        } else{
            res.status(404)
            throw new Error('No badges found!')
        }
    }

});

const updateBadge = asyncHandler(async (req,res) =>{
    if(req.user.role!='admin'){
        res.status(403)
        throw new Error('permission denied')
    } else{
        const {badgeId} = req.body;
        const badge = await Badge.findOne({_id:badgeId});
        if(badge){
            badge.badgeName  = req.body.badgeName || badge.badgeName;
            badge.pointsNeeded  = req.body.pointsNeeded || badge.pointsNeeded;
            badge.imageURL  = req.body.imageURL || badge.imageURL;
            
            await badge.save();
            nodeCache.del('allBadges')
            return res.status(201).json({
                data:badge
            })
        } else{
            res.status(404)
            throw new Error('Badge not found!')
        }
    }
})

const deleteBadge = asyncHandler(async (req,res) => {
    if(req.user.role!='admin'){
        res.status(403)
        throw new Error('permission denied')
    } else{
        const {badgeId} = req.body;

        const result = await Badge.deleteOne({_id:badgeId});
        if(result.deleteCount>0){
            nodeCache.del('allBadges')
            res.status(200).json({
                message:'deleted successfully'
            })
        } else{
            res.status(409 )
            throw new Error('Could not delete')
        }
    }

})

const getMultipleBadgesOfOneUser = asyncHandler(async(req,res) => {
        const allBadges = req.user.badges;        
        let allBadgesOfUser;
        if(nodeCache.has('allBadgesOfUser')){
            allBadgesOfUser = JSON.parse(nodeCache.get('allBadgesOfUser'));
        } else{
            allBadgesOfUser = await Badge.find({_id: {$in :allBadges}});
            nodeCache.set('allBadgesOfUser',JSON.stringify(allBadgesOfUser));
        }
        if(allBadgesOfUser.length>0){
            res.status(200).json({
                data:allBadgesOfUser
            })
        } else{
            res.status(404)
            throw new Error('No badges found!')
        }
});

export {createBadge,getAllBadges,updateBadge,deleteBadge,getMultipleBadgesOfOneUser}
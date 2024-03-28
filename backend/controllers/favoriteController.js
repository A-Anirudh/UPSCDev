import { Affair, Favourite } from "../models/affairsModel.js";
import { v4 as uuidv4 } from 'uuid';
import NodeCache from "node-cache";
import asyncHandler from "express-async-handler";

const nodeCache = new NodeCache();

const addFavourite = asyncHandler(async (req, res) => {
    const {affairId} = req.body;
    const affair = await Affair.findOne({_id:affairId})
    const exists = await Favourite.findOne({userId: req.user._id, affairId:affairId})
    if(exists){
        res.status(403)
        throw new Error('Favourite already exists')
    }
    if(affair){
        const favouriteAffair = await Favourite.create({
            pid:uuidv4(),
            affairId,
            userId: req.user._id
        });
        if(favouriteAffair){
            res.status(201).json({
                pid:favouriteAffair.pid,
                affairName: favouriteAffair.affairName,
            });
        } else{
            res.status(400);
            throw new Error('Invalid data entered!')
        }
    }

});

const allMyFavourites = asyncHandler(async (req,res) => {
    const allFavourites = await Favourite.find({userId:req.user._id})

    const allFavAffairs = []

    if(allFavourites.length!=0){
        for(let i=0;i<allFavourites.length;i++){
            const aff = await Affair.findOne({_id:allFavourites[i].affairId});
            allFavAffairs.push(aff);
        }
        res.status(200).json({
            "data":allFavourites,
            "affairs":allFavAffairs
        })
    } else{
        res.status(200).json({"data":"No data found"})
    }
})

const deleteFavourite = asyncHandler(async (req,res) => {
    const {pid} = req.body;
    const favourite = await Favourite.findOne({pid:pid})
    if(favourite){
        await Favourite.deleteOne({pid:pid})
        res.status(201).json({
            message: "deleted successfully",
            pid
        });
    } else{
        res.status(404)
        throw new Error('Favourite not found!')
    }
})


export {addFavourite,allMyFavourites,deleteFavourite}
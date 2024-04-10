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

const allMyFavourites = asyncHandler(async (req, res) => {
    const allFavourites = await Favourite.find({ userId: req.user._id });

    if (allFavourites.length !== 0) {
        for (let i = 0; i < allFavourites.length; i++) {
            const favourite = allFavourites[i];
            const aff = await Affair.findOne({ _id: favourite.affairId }).select('thumbnail affairName');

            if (aff) {
                favourite.thumbnail = aff.thumbnail;
                favourite.name = aff.affairName;
            } else {
                res.status(404)
                throw new Error('Unable to find articles!')
            }
        }

        res.status(200).json({
            "data": allFavourites.map(favourite => ({
                _id: favourite._id,
                pid: favourite.pid,
                affairId: favourite.affairId,
                userId: favourite.userId,
                createdAt: favourite.createdAt,
                updatedAt: favourite.updatedAt,
                thumbnail: favourite.thumbnail,
                name: favourite.name,
                __v: favourite.__v
            }))
        });
    } else {
        res.status(200).json({ "data": "No data found" });
    }
});


const checkIfFavourite = asyncHandler(async (req,res) => {
    const {affairId} = req.query
    const allFav = await Favourite.findOne({userId: req.user.id, affairId})

    if(allFav){
        res.status(200).json({message:true})
    } else{
        res.status(200).json({message:false})
    }
})

const deleteFavourite = asyncHandler(async (req,res) => {
    const {id} = req.body;
    const favourite = await Favourite.findOne({affairdId:id})
    if(favourite){
        await Favourite.deleteOne({affairdId:id})
        res.status(201).json({
            message: "deleted successfully",
            pid
        });
    } else{
        res.status(404)
        throw new Error('Favourite not found!')
    }
})


export {addFavourite,allMyFavourites,deleteFavourite,checkIfFavourite}
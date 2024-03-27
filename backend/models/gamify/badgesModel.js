import mongoose from "mongoose";

const badgeSchema = mongoose.Schema({
    badgeName:{
        type:String //URL of the image of the badge
    },
    imageURL:{
        type:String
    },
    pointsNeeded : {
        type:Number
    }

});
const Badge = mongoose.model('Badge', badgeSchema);

export {Badge};
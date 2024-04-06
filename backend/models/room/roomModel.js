import mongoose from "mongoose";

const studyRoomSchema = mongoose.Schema({
    roomId: {
        type:String,
        required:true,
        unique:true
    },
    roomName:{
        type:String,
        required:true
    },
    roomOwner:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required:true
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }],
    isActive:{
        type:Boolean,
        default:true
    },
    meetingSummary:{
        type:String
    }
},{
    timestamps: true
});
const StudyRoom = mongoose.model('StudyRoom', studyRoomSchema);

export {StudyRoom};
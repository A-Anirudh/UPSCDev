import mongoose from "mongoose";

const studyRoomSchema = mongoose.Schema({
    roomId: {
        type:Strings,
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
    users:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
});
const StudyRoom = mongoose.model('StudyRoom', studyRoomSchema);

export {StudyRoom};
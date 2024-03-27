import mongoose from "mongoose";

const reportBugSchema = mongoose.Schema({
    reportedBy: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    complaint:{
        type:String,
        required:true
    },
    image_link:{
        type:String,
    },
    status:{
        type:String,
        enum:['Active','Fixed']
    }
},{timestamps: true})

reportBugSchema.index({ reportedBy: 1 });



const ReportBug = mongoose.model('ReportBug', reportBugSchema);
export {ReportBug};
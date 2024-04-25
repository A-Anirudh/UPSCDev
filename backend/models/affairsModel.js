import mongoose from "mongoose";

const affairSchema = mongoose.Schema({
    pid:{
        type:String,
        required:true,
        unique: true
    },
    folderId:{
        type:String,
        required:true
    },
    thumbnail: {
        type: String,
        required:true
      },
      thumbnail_small:{
        type: String,
        // required:true
      },
    affairName: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    article: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    audio:{
        type:String,
        // required:true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }, 
    subject:{
        type:String,
        required:true,
        enum:['History', 'Society','Geography','Polity','Constitution','Governance','Welfare Initiatives',
    'Social Justice','International Relations','Economic Development','Agriculture','Science and Technology','Biodiversity','Disaster Management','Security','Ethics','Aptitude','Attitude','Emotional Intelligence','Values','Probity']
    },
    isCurrentAffair:{
        type:Boolean,
        default:false,
        required:true
    }
}, {
    timestamps: true
});


const eventSchema = mongoose.Schema({
    pid:{
        type:String,
        required:true,
    },
    eventName: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    affairId :{
        type: mongoose.Schema.Types.ObjectId, ref: 'Affair',
        required:true
    }

}, {
    timestamps: true
});

const favoriteSchema = mongoose.Schema({
    pid:{
        type:String,
        required:true,
        unique: true
    },
    affairId :{
        type: mongoose.Schema.Types.ObjectId, ref: 'Affair',
        required:true
    },
    userId :{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required:true
    }
}, {
    timestamps: true
});

const Favourite = mongoose.model('Favourite',favoriteSchema)
const Affair = mongoose.model('Affair', affairSchema);
const Event = mongoose.model('Events',eventSchema)

export {Affair, Event,Favourite};
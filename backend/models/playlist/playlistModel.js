
import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({
    playlistName:{
        type:String,
        unique:true
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    articles:[{
        articleId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Affair',
        },
        articleName:{
            type:String,
            
        },
        thumbnail:{
            type:String,
        }

    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Playlist = mongoose.model('playlist', playlistSchema);
export {Playlist};
import asyncHandler from "express-async-handler";
import { Playlist } from "../../models/playlist/playlistModel.js";
import NodeCache from "node-cache";

const nodeCache = new NodeCache();

// GET REQUEST, PROTECTED ROUTE

const getAllPlaylistsOfUser = asyncHandler(async(req,res) => {
    let allPlaylist;
    if(nodeCache.has('allPlaylistOfUser')){
        allPlaylist = JSON.parse(nodeCache.get('allPlaylistOfUser'));
    } else{
        allPlaylist = await Playlist.find({userId:req.user.id});
        nodeCache.set('allPlaylistOfUser',JSON.stringify(allPlaylist));
    }
    if(allPlaylist.length >0){
        res.status(200).json({
            data:allPlaylist
        })
    } else{
        res.status(200).json({
            data:[]
        })
    }
})

// POST REQUEST, PROTECTED ROUTE
const createPlaylist = asyncHandler(async (req,res) => {
        const {playlistName} = req.body;

        const existingPlaylist = await Playlist.findOne({playlistName:playlistName, userId:req.user.id })
        if(existingPlaylist){
            res.status(400)
            throw new Error('Playlist name already exists! please choose new name')
        } else{
            const newPlaylist = await Playlist.create({
                playlistName,
                userId: req.user.id,
            })
    
            if(newPlaylist){
                nodeCache.del('allPlaylistOfUser');
                res.status(200).json({
                    "message":`Playlist ${playlistName} created!`
                })
    
            }else{
                res.status(500)
                throw new Error('Unable to create now!')
            }
        }
})

// PUT REQUEST, PROTECTED ROUTE

const updatePlaylistName = asyncHandler(async (req,res) => {
    const {newName,playlistId} = req.body;

    const playlist = await Playlist.findOne({_id:playlistId});

    if(playlist){
        if(String(playlist.userId) === req.user.id || req.user.role==='admin'){
            playlist.playlistName = newName || playlist.playlistName
            await playlist.save();
            nodeCache.del('allPlaylistOfUser');

            res.status(201).json({
                "message":"name updated successfully!"
            })
        } else{
            res.status(401)
            throw new Error('You cannot access this route!')
        }
    } else{
        res.status(404)
        throw new Error('Playlist not found')
    }

})

// DELETE REQUEST, PROTECTED ROUTE
const deletePlaylist = asyncHandler(async(req,res) => {
    const {playlistId}= req.body;
    const result = await Playlist.deleteOne({_id:playlistId});
    if(result.deletedCount >0){
        nodeCache.del('allPlaylistOfUser');

        res.status(201).json({
            message: "deleted successfully"
        });
    } else{
        res.status(404).json({
            message: 'Favourite not found!'
        });

    }

})

const addAffairToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, article } = req.body;

    const playlist = await Playlist.findOne({ _id: playlistId });

    if (playlist) {
        const existingArticle = playlist.articles.find(
            (existing) => existing.articleId.toString() === article.articleId.toString()
        );

        if (existingArticle) {

            res.status(400).json({
                message: "Article already exists in the playlist",
                playlistId,
                article,
            });
        } else {
            await Playlist.updateOne(
                { _id: playlistId },
                { $push: { articles: article } }
            );
            nodeCache.del('allPlaylistOfUser');

            res.status(201).json({
                message: "Article added to the playlist successfully",
                playlistId,
                article,
            });
        }
    } else {
        res.status(404).json({
            message: "Playlist not found!",
            playlistId,
        });
    }
});

const deleteArticleFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, articleId } = req.body;

    const playlist = await Playlist.findOne({ _id: playlistId });

    if (playlist) {
        const updatedArticles = playlist.articles.filter(
            (existing) => existing.articleId.toString() !== articleId.toString()
        );

        if (playlist.articles.length === updatedArticles.length) {
            // No article was removed
            res.status(404).json({
                message: "Article not found in the playlist",
                playlistId,
                articleId,
            });
        } else {
            await Playlist.updateOne(
                { _id: playlistId },
                { $set: { articles: updatedArticles } }
            );
            nodeCache.del('allPlaylistOfUser');

            res.status(200).json({
                message: "Article removed from the playlist successfully",
                playlistId,
                articleId,
            });
        }
    } else {
        res.status(404).json({
            message: "Playlist not found!",
            playlistId,
        });
    }
});
export {getAllPlaylistsOfUser,createPlaylist,updatePlaylistName,deletePlaylist,addAffairToPlaylist,deleteArticleFromPlaylist}
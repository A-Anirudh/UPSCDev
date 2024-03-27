import express from "express";
import { protect } from "../../middleware/authMiddleware.js";
import { addAffairToPlaylist, createPlaylist, deleteArticleFromPlaylist, deletePlaylist, getAllPlaylistsOfUser, updatePlaylistName } from "../../controllers/playlist/playlistController.js";

const PlaylistRoute = express.Router();

PlaylistRoute.route('/addPlaylist').post(protect,createPlaylist)
PlaylistRoute.route('/updatePlaylist').put(protect,updatePlaylistName)
PlaylistRoute.route('/addToPlaylist').post(protect,addAffairToPlaylist)
PlaylistRoute.route('/getAll').get(protect,getAllPlaylistsOfUser)
PlaylistRoute.route('/deletePlaylist').delete(protect,deletePlaylist)
PlaylistRoute.route('/deleteFromPlaylist').delete(protect,deleteArticleFromPlaylist)

export default PlaylistRoute;
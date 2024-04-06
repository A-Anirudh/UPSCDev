import express from 'express';
import { createRoom, joinRoom, leaveRoom,getAllStudyRooms, endRoom } from '../../controllers/room/roomController.js';
import { protect } from '../../middleware/authMiddleware.js';
import isAdmin from '../../middleware/adminMiddleware.js';


const roomRoute = express.Router();
// Get all rooms

roomRoute.get('/all',protect,isAdmin,getAllStudyRooms)
// Route to create a study room
roomRoute.post('/create-room', protect, createRoom);

// Route to leave a study room
roomRoute.post('/leave-room', protect, leaveRoom);

// Route to delete a study room
roomRoute.delete('/delete-room', protect, endRoom);

// Route to join a study room
roomRoute.post('/join-room', protect, joinRoom);

export default roomRoute;

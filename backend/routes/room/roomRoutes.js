import express from 'express';
import { createRoom, joinRoom, leaveRoom,getAllStudyRooms, endRoom,getAllUsersOfARoom, allMyMeetings, validRoom } from '../../controllers/room/roomController.js';
import { protect } from '../../middleware/authMiddleware.js';
import isAdmin from '../../middleware/adminMiddleware.js';


const roomRoute = express.Router();
// Get all rooms

roomRoute.get('/all',protect,isAdmin,getAllStudyRooms)
// Route to create a study room
roomRoute.post('/create-room', protect, createRoom);

// Route to leave a study room
roomRoute.put('/leave-room', protect, leaveRoom);

// Route to delete a study room
roomRoute.put('/delete-room', protect, endRoom);

// Route to join a study room
roomRoute.put('/join-room', protect, joinRoom);

// All users of a room
roomRoute.get('/get-all-users',protect,getAllUsersOfARoom)

// Get all meetings of one user!
roomRoute.get('/get-all-my-meetings',protect,allMyMeetings)
roomRoute.get('/valid-room',protect,validRoom)

export default roomRoute;

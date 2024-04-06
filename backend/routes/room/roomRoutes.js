import express from 'express';
import { createRoom, deleteRoom, joinRoom, leaveRoom } from '../../controllers/room/roomController';


const roomRoute = express.Router();

// Route to create a study room
roomRoute.post('/create-room', protect, createRoom);

// Route to leave a study room
roomRoute.post('/leave-room', protect, leaveRoom);

// Route to delete a study room
roomRoute.delete('/delete-room', protect, deleteRoom);

// Route to join a study room
roomRoute.post('/join-room', protect, joinRoom);

export default roomRoute;

import asyncHandler from "express-async-handler";
import { StudyRoom } from "../../models/room/roomModel.js";
import { generateRandomString } from "../../utils/randomIdGenerator.js";
import jwt from "jsonwebtoken";


// Socket programming here? for room related.. let's do it!!
// Socket programming here

import { Server } from 'socket.io'
import {createServer} from 'http'
import cors from 'cors'
import express from "express";
import cookieParser from "cookie-parser";
import User from "../../models/userModel.js";


const app = express();
const server = createServer(app);

server.listen(8000, () =>{
    console.log(`socket is ready and running on port 8000`)
})
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

io.use((socket, next) => {
    cookieParser()(socket.request, socket.request.res, async(err) => {
      if (err) return next(err);
      const token = socket.request.cookies.jwt;
      if (!token) return next(new Error("Authentication Error"));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.request.user = await User.findById(decoded.userId).select('-password');
      next();
    });
  });


io.on('connection', (socket) => {

    // Create room and join room should be different..
    socket.on('create-room', async (roomName) => {
        let roomId = generateRandomString();
        const roomOwner = socket.request.user.id
        // console.log('roomOwnerID ', roomOwner)
        while (true) {
            // Check if roomId already exists in database
            const existingRoomWithId = await StudyRoom.findOne({ roomId: roomId });

            // If roomId exists, generate a new one and continue the loop
            if (existingRoomWithId) {
                roomId = generateRandomString();
            } else {
                // If unique roomId is found, break the loop
                break;
            }
        }

        const userRooms = await StudyRoom.find({ users: { $in: [roomOwner] }, isActive:true });

        // console.log(userRooms)
        if(userRooms.length>0){
                console.log('ppart of another room - create room')
                return socket.emit("send-message-to-self", 'already in another room, please quit to continue');        
        }
            // Create the study room
            const newRoom = await StudyRoom.create({
            roomId,
            roomOwner,
            roomName,
            users : [roomOwner]
            });

            if(newRoom){
                console.log('room created and redirecting to room page!!')
                socket.emit('redirect', roomId)
                socket.emit("send-message-to-self", newRoom);
            } else{
                socket.emit("send-message-to-self", 'something went wrong!');
            }
            
    })

    // Join room
    
    socket.on('join-room', async (roomId, username, callback) => {

            console.log('join-room has been called by frontend')
            socket.roomId = roomId
            socket.username = username
    
            const userId = socket.request.user.id
            console.log('before finding room!!')
            // Find the room by roomId
            const room = await StudyRoom.findOne({ roomId, isActive:true });
    
            console.log('room found successfully')
    
            if (!room) {
                console.log('room not found bruh!')
                return socket.emit("send-message-to-self", 'room not found!');
            }
            
            const userRooms = await StudyRoom.find({ users: { $in: [userId] }, isActive:true  });
    
            if(userRooms.length>0){
                if(userRooms[0].roomId !== roomId){
                    console.log('ppart of another room',username)
                    socket.emit('redirect-home','already in another room!!')
                    return socket.emit("send-message-to-self", 'already in another room, please quit to continue');    
                }
            }
    
            console.log('Checked if part of another room or not!')
    
    
            const currentRoomUsers = room.users
    
            const index = currentRoomUsers.indexOf(userId)
    
            console.log('About to push and save')
            
            if(index == -1){
            // Add the user to the room
                room.users.push(userId);
                await room.save();
            }
    
            // adding the person to room
            console.log('Before socket join.........')
            socket.join(roomId)
            callback()
            console.log(username, 'joineed the room', roomId)
            
            socket.emit('redirect', roomId)
            socket.to(roomId).emit('notify-everyone', {roomId, username});
    })

    // Send message
    socket.on('message', ({message, room,username})=>{
        // socket.broadcast.emit('receive-message',data) //sends to everyone except sender
        io.to(room).emit('receive-message',{message,username})
    })

    //  ! Get all users socket comes here

    socket.on('get-room-details', async(roomId) => {
        const roomDetails = await StudyRoom.findOne({roomId}).select('roomOwner users roomName')
        if(roomDetails){
            const usersList = await User.find({_id:{$in: roomDetails.users}}).select('username').sort({username:1})
            console.log("room is:", roomDetails)
            console.log("usernames are:", usersList)
            io.to(roomId).emit('get-room-details-response', {roomDetails, usersList})
        } else{
            console.log('room Id not found!')
        }
    })

    socket.on('leave-room', async (roomId, username) => {
        const userId = socket.request.user.id;
    
        try {
            // Update the document directly in the database without retrieving it
            const result = await StudyRoom.updateOne(
                { roomId, users: userId }, // Update only if the user is in the room
                { $pull: { users: userId } } // Pull the user from the users array
            );
    
            if (result.nModified === 0) {
                console.log('User is not in the room or room not found');
                return socket.emit("send-message-to-self", 'User is not in the room or room not found');
            }
    
            console.log('Room left successfully');
            
            socket.to(roomId).emit('notify-everyone-leave', {roomId, username});
        } catch (error) {
            console.error('An error occurred while leaving the room:', error);
            // Handle errors
        }
    });

    socket.on('end-meet', async(roomId, roomOwner) => {
    // Find the room by roomId and roomOwner
        const room = await StudyRoom.findOne({ roomId, roomOwner });

        if (room) {
            room.isActive = false;
            room.users = [];
            await room.save();
            // console.log('Room ended sucessfully')
            io.to(roomId).emit('notify-left-everyone')
            io.to(roomId).emit('redirect-home')
        } else{
            io.to(roomId).emit('end-meet-error', 'room not found!')
        }
    })

      socket.on("disconnect", () => {
        if (socket.roomId && socket.username) {
            console.log('disconnect!', socket.username, socket.id)
            socket.emit('leave-room', socket.roomId, socket.username);
            socket.emit('get-room-details', socket.roomId);
        }
    });   
})

// Admin only route
const getAllStudyRooms =  asyncHandler(async(req,res) => {
    const all = await StudyRoom.find({})
    res.status(200).json({
        data:all
    })
})

// @desc    Create a new study room
// @route   POST /api/study-rooms/create-room
// @access  Private
const createRoom = asyncHandler(async (req, res) => {

    let roomId = generateRandomString();
    const { roomName} = req.body;
    const roomOwner = req.user.id

    while (true) {
        // Check if roomId already exists in database
        const existingRoomWithId = await StudyRoom.findOne({ roomId: roomId });
        console.log('exists??', existingRoomWithId)
        // If roomId exists, generate a new one and continue the loop
        if (existingRoomWithId) {
            roomId = generateRandomString();
            console.log('roomId found',roomId)
        } else {
            // If unique roomId is found, break the loop
            break;
        }
    }


    // Checking if that owner is already in another owner of some room or not
    const existingRoom = await StudyRoom.findOne({ roomOwner, isActive:true });

    if(existingRoom){
        return res.status(400).json({
            message:'Already part of a room, please quit to join another room!'
        })  
    }
    // Create the study room
    const newRoom = await StudyRoom.create({
      roomId,
      roomOwner,
      roomName,
      users : [roomOwner]
    });

    if(newRoom){
        res.status(201).json({ success: true, data: newRoom });
    } else{
        res.status(400).json({message:'Something went wrong, please try again later!'})
    }
});


// @desc    Join an existing study room
// @route   POST /api/study-rooms/join-room
// @access  Public
const joinRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.body;
    const userId = req.user.id;
    // Find the room by roomId
    const room = await StudyRoom.findOne({ roomId, isActive:true });
    
    const userRooms = await StudyRoom.find({ users: { $in: [userId] } });

    if(userRooms.length>0){
        res.status(400)
        throw new Error('User in another room, please leave other rooms!')
    }
    if (!room) {
      res.status(404)
      throw new Error('Room not found!')
    }
  
    // Check if the user is already in the room
    if (room.users.includes(userId)) {
        res.status(400)
        throw new Error('User already exists in this room!')
    }
  
    // Add the user to the room
    room.users.push(userId);
    await room.save();
  
    res.status(200).json({ success: true, data: room });
});

// @desc    Leave a study room
// @route   POST /api/study-rooms/leave-room
// @access  Public
const leaveRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.body;
    const userId = req.user.id;
    // Find the room by roomId
    const room = await StudyRoom.findOne({ roomId });
  
    if (!room) {
      res.status(404)
      throw new Error('Room not found!')
    }
  
    // Check if the user is in the room
    const userIndex = room.users.indexOf(userId);
    if (userIndex === -1) {
      res.status(400)
      throw new Error('User not in room! Cannot leave the room without joining')
    }
    // All users might leave, but never end the meeting... so we need to ensure that the meeting is ended if the owner leaves or else, some other termination condition should be used
    
    // Remove the user from the room
    room.users.splice(userIndex, 1);
    await room.save();
  
    res.status(200).json({ success: true, data: room });
  });

//   PUT request to change isActive to false
// Because, we need summary of the audio too later
const endRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.body;

    const roomOwner = req.user.id

    // Find the room by roomId and roomOwner
    const room = await StudyRoom.findOne({ roomId, roomOwner });

    if (room) {
        room.isActive = false;
        room.users = [];
        await room.save()   
        res.status(200).json({ message:'Meeting ended' });
    } else{

        res.status(404)
        throw new Error('Room not found!')
    }

});

const getAllUsersOfARoom = asyncHandler(async (req,res) => {
    const {roomId} = req.query
    const users = await StudyRoom.findOne({roomId}).select('roomName users roomOwner')
    const usernames = await User.find({_id:{$in: [users.users]}})
    if(users){
        res.status(200).json({
            data:users,
            usernames: usernames
        })
    } else{
        res.status(400)
        throw new Error('Could not find users')
    }
});

const allMyMeetings = asyncHandler(async (req,res) => {
    const allMeetings = await StudyRoom.find({roomOwner:req.user.id})

    console.log(allMeetings)
    if(allMeetings.length > 0){
        res.status(200).json({
            success:true,
            data:allMeetings
        })
    } else{
        res.status(200).json({
            success:false,
            message:'No meetings found'
        })
    }
})


// Check if valid room
const validRoom = asyncHandler(async (req,res) => {

    const {roomId} = req.query

    // Find the room by roomId
    const room = await StudyRoom.findOne({ roomId, isActive:true });

    if (!room) {
        console.log('room not found API call!')
        res.status(404)
        throw new Error('Room not found!')
    }

    res.status(200).json({
        message:'Valid room'
    })

})

export {getAllStudyRooms, createRoom, joinRoom,leaveRoom,endRoom,getAllUsersOfARoom,allMyMeetings,validRoom};
  
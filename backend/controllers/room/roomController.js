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
    console.log(`server is ready and running on port 8000`)
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

        // Checking if that owner is already in another owner of some room or not
        const existingRoom = await StudyRoom.findOne({ roomOwner, isActive:true });

        if(existingRoom){
           return socket.emit("send-message-to-self", 'already in another room, please quit to continue');
        } else{
            // Create the study room
            const newRoom = await StudyRoom.create({
            roomId,
            roomOwner,
            roomName,
            users : [roomOwner]
            });

            if(newRoom){
                console.log('room was created successfully')

                console.log('room id is:', roomId)

                socket.join(roomId);

                console.log(roomOwner,'joined', roomId, 'after creating it!')

                socket.emit('redirect', roomId)
                console.log('room redirected with ID',roomId)
                socket.emit("send-message-to-self", newRoom);
            } else{
                socket.emit("send-message-to-self", 'something went wrong!');
            }
            }
    })

    // Join room
    
    socket.on('join-room', async (roomId, username) => {
        

        const userId = socket.request.user.id

        // Find the room by roomId
        const room = await StudyRoom.findOne({ roomId, isActive:true });

        if (!room) {
            return socket.emit("send-message-to-self", 'room not found!');
        }
        
        const userRooms = await StudyRoom.find({ users: { $in: [userId] } });



        if(userRooms.length>0){
            // console.log('userRooms: ',userRooms)
            // console.log("first user", String(userRooms[0].users[0]))
            // console.log("roomOwner: ", String(userRooms[0].roomOwner))
            // console.log(String(userRooms[0].users[0]) === String(userRooms[0].roomOwner))
            if(String(userRooms[0].users[0]) === String(userRooms[0].roomOwner)){
                // pass
            } else{
                console.log('ppart of another room',username)
                return socket.emit("send-message-to-self", 'already in another room, please quit to continue');    
            }
        }

        // // Check if the user is already in the room
        // if (room.users.includes(userId)) {
        //     console.log('already part of room XD',username)
        //     return socket.emit("send-message-to-self", 'already part of this room');
            
        // }
      
        // Add the user to the room
        room.users.push(userId);
        await room.save();

        // adding the person to room
        socket.join(roomId)
        console.log(username, 'joineed the room', roomId)
        socket.to(roomId).emit('notify-everyone', {roomId, username});
       
    })

    // Send message
    socket.on('message', ({message, room,username})=>{
        // socket.broadcast.emit('receive-message',data) //sends to everyone except sender
        io.to(room).emit('receive-message',{message,username})
    })

    // Get all users

    socket.on('all-users', async (roomId) => {
        try {
          const users = await StudyRoom.findOne({roomId}).select('roomName users roomOwner');
          if (users) {
            io.to(roomId).emit('reply-all-users', users );
            console.log('all users are',users.users)
          } else {
            io.to(roomId).emit('reply-all-users', 'No users found');
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          io.to(roomId).emit('error-fetching-users');
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
    const users = await StudyRoom.findById(roomId).select('roomName users roomOwner')
    console.log(users)
    if(users){
        res.status(200).json({
            data:users
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


export {getAllStudyRooms, createRoom, joinRoom,leaveRoom,endRoom,getAllUsersOfARoom,allMyMeetings};
  
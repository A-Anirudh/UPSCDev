import asyncHandler from "express-async-handler";
import { StudyRoom } from "../../models/room/roomModel.js";


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

    const { roomId,roomName} = req.body;
    const roomOwner = req.user.id
    // Checking if that owner is already in another owner of some room or not
    const existingRoom = await StudyRoom.findOne({ roomOwner, isActive:true });

    if(existingRoom){
        res.status(400).json({
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
  
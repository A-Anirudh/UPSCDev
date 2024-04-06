import asyncHandler from "express-async-handler";

// @desc    Create a new study room
// @route   POST /api/study-rooms/create-room
// @access  Private
const createRoom = asyncHandler(async (req, res) => {

    const { roomId } = req.body;
    const roomOwner = req.user.id

    // Checking if that owner is already in another owner of some room or not
    const existingRoom = await StudyRoom.findOne({ roomOwner });

    if(existingRoom){
        res.status(400).json({
            message:'Already part of a room, please quit to join another room!'
        })
    }
    // Create the study room
    const newRoom = await StudyRoom.create({
      roomId,
      roomOwner,
      users: [roomOwner],
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
    const room = await StudyRoom.findOne({ roomId });
  
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
  
    // Remove the user from the room
    room.users.splice(userIndex, 1);
    await room.save();
  
    res.status(200).json({ success: true, data: room });
  });

const deleteRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.body;

    const roomOwner = req.user.id
    // Find the room by roomId and roomOwner
    const room = await StudyRoom.findOne({ roomId, roomOwner });

    if (!room) {
        res.status(404)
        throw new Error('Room not found!')
    }

    // Delete the room
    await room.remove();

    res.status(200).json({ success: true, data: {} });
});

export { createRoom, joinRoom,leaveRoom,deleteRoom};
  
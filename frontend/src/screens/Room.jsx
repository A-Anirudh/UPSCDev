import React, {useEffect,useMemo,useState} from 'react'
import {io} from 'socket.io-client'
import { useNavigate, useParams } from "react-router-dom";
import { toastSuccess } from '../utils/myToast';
import toast from 'react-hot-toast';
import { useLazyAllUsersOfRoomQuery } from '../slices/roomSlice';
import { meetingExists } from '../slices/quizOpenSlice';
import { useDispatch } from 'react-redux';
import { redirect } from "react-router-dom";

  
export const Room = ({roomId}) => {

  // const navigate = useNavigate()
  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_SOCKET_URL, {
        withCredentials: true,
      }),
    []
  );

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const username = userInfo.data.username
  const userId = userInfo.data.id;

  // const { roomId } = useParams();
  const [room, setRoom] = useState(roomId);
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [socketID, setSocketID] = useState("")
  const [usersList, setUsersList] = useState([])
  const[userLeft, setUserLeft] = useState(false)

  const [roomOwnerId, setRoomOwnerId] = useState('')
  const [roomName, setRoomName] = useState('')
  const dispatch = useDispatch();

  const [allUsers] = useLazyAllUsersOfRoomQuery()

  function playSound() {
    var audio = new Audio('https://res.cloudinary.com/duuwrm4bh/video/upload/v1712860559/NotifAudio/userJoined1_isixda.mp3');
    audio.play();
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message',{message,room,username});
    setMessage("")
  }


  const handleLeaveMeet = () => {
    console.log('leeave room button clicked!!!!')
    dispatch(meetingExists(false))
    // Because component changes, automatically leave-meet is being called
    setUserLeft(true)
    return redirect('/home')
  }

  const handleEndMeet = () => {
    socket.emit('end-meet',roomId, roomOwnerId)
    dispatch(meetingExists(false))
    console.log('End meet!')
  } 

  useEffect(() => {    
    socket.on('connect', () => {
      console.log('connected',socket.id)
      setSocketID(socket.id)
    });

    socket.emit("join-room", room, username, () => {
      socket.emit('get-room-details', roomId)
    });
    
    socket.on('get-room-details-response', ({roomDetails, usersList}) => {
      console.log("Room details: ", roomDetails)
      console.log("User list: ", usersList)
      setRoomName(roomDetails.roomName)
      setRoomOwnerId(roomDetails.roomOwner)
      setUsersList(usersList)
      console.log(usersList)
    })

    socket.on("receive-message", (data) => {
      // console.log(data)
      setMessages((messages) => [...messages,data])
    })

    socket.on('notify-everyone', ({roomId, username}) =>{
      console.log('notify everyone',roomId, username)
      playSound()
      toastSuccess(`${username} joined this meet`);
    })

    socket.on('notify-everyone-leave',({roomId, username}) => {
      console.log(`${username} left this meet`)
      toastSuccess(`${username} left this meet`);
    })

    socket.on('notify-left-everyone', () => {
      toastSuccess('Meeting ended by owner!')
    })

    socket.on('send-message-to-self', (message) => {
      toast.error(message)
      return redirect('/')
    })

    socket.on('redirect-home', () => {
      console.log('redirect home called!')
      return redirect('/')
    })


    return () => {
      // Call all component change stuff here... 
      socket.emit('leave-room',roomId,username)
      socket.emit('get-room-details', roomId)
      console.log('left the room')
      socket.disconnect();
    }
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Room Details</h2>
      <p>
        <span className="font-semibold">Room Id:</span> {roomId}
        <br />
        <span className="font-semibold">Room name:</span> {roomName}
      </p>

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 p-2 rounded mr-2 w-full"
            placeholder="Type your message here..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </form>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Chat Messages:</h3>
        <div className="mt-4">
          {messages.map((m, index) => (
            <div
              key={index}
              className={`py-2 px-4 mb-2 rounded-lg ${
                index % 2 === 0 ? 'bg-blue-200' : 'bg-gray-200'
              }`}
            >
              <span className="font-bold">{m.username}: </span>
              {m.message}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleLeaveMeet}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Leave meet
        </button>
        {roomOwnerId === userId && (
          <button
            onClick={handleEndMeet}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
          >
            End meet
          </button>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Users List:</h3>
        <div className="pl-4 mt-2">
          {usersList.map((user, index) => (
            <div key={index} className="mt-1">
              {user.username}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
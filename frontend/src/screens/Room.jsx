import React, {useEffect,useMemo,useState} from 'react'
import {io} from 'socket.io-client'
import { useNavigate, useParams } from "react-router-dom";
import { toastSuccess } from '../utils/myToast';
import toast from 'react-hot-toast';
import { useLazyAllUsersOfRoomQuery } from '../slices/roomSlice';
  
export const Room = () => {

  const navigate = useNavigate()
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

  const { roomId } = useParams();
  const [room, setRoom] = useState(roomId);
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [socketID, setSocketID] = useState("")
  const [usersList, setUsersList] = useState([])
  const[userLeft, setUserLeft] = useState(false)

  const [roomOwnerId, setRoomOwnerId] = useState('')
  const [roomName, setRoomName] = useState('')

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
    // Because component changes, automatically leave-meet is being called
    setUserLeft(true)
    navigate('/home')
  }

  const handleEndMeet = () => {
    socket.emit('end-meet',roomId, roomOwnerId)
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
      navigate('/')
    })

    socket.on('redirect-home', () => {
      console.log('redirect home called!')
      navigate('/')
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
    <div>
      Room Id: {roomId}
      <br /><br />
      Room name : {roomName}

      <br /><br />
        <div>
          <form onSubmit={handleSubmit}>
          <input type="text" name="message" id="message" value={message} onChange={e=>setMessage(e.target.value)} style={{ border: '1px solid red' }} />
          <button style={{ border: '1px solid green' }} type='submit'>SEND</button>
          </form>
        </div>

        {messages.map((m, i) => (
          <div key={i}>
            {m.username} :
            {m.message}
          </div>
        ))}

        <button onClick={handleLeaveMeet} className='bg-red-800 border'>Leave meet</button>
        {/* Show only if owner of room!! */}
        { roomOwnerId === userId ? <button onClick={handleEndMeet} className='bg-red-800 border'>End meet</button> : ''}

        <br />
        Users list: 
        <br />
        <ol>
          {usersList.map((user, index) => {
            
            return <li key={index}>{user.username}</li>
          })}
        </ol>


    </div>
  )
}
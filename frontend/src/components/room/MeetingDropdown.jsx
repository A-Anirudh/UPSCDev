import React, {useEffect,useMemo,useState} from 'react'
import {io} from 'socket.io-client'
import { DropDown } from '../Common/DropDown'
import { Link, useNavigate } from "react-router-dom";
import { useLazyValidRoomQuery } from '../../slices/roomSlice';
import toast from "react-hot-toast";


// !Leave room and disconnect stuff

export const MeetingDropdown = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [roomName, setRoomName] = useState('Study')
  const [roomId, setRoomId] = useState('')

  const [checkValidRoom] = useLazyValidRoomQuery()

  const navigate = useNavigate()

  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_SOCKET_URL, {
        withCredentials: true,
      }),
    []
  );


    function handleCreateRoom() {
      socket.emit('create-room',roomName);
      // console.log('room create request was sent to backend socket, with room name',roomName)
      setRoomName("")
    }
                      
    async function handleJoinRoom() {
      const {data, error} = await checkValidRoom(roomId)
      try{
        if (data) {
          navigate(`room/${roomId}`);
        } else {
          // console.log(data)
          toast.error('Invalid room')
          
          // navigate('home')
          // console.log('Invalid room',error);
        }
 
      } catch{
        
        toast.error('Something went wrong!')
        // navigate('home')
      }
    }

    
    useEffect(() => {
      socket.on('send-message-to-self',(data) => {
        // console.log(data)
      })

      socket.on('redirect', (roomId)=>{
        navigate(`room/${roomId}`)
      })
    
      return () => {
        socket.disconnect()
      }
    }, [])


  return (
    <div className='z-[1000] relative w-[350px]' >
    <button onClick={() => setIsOpen(true)} >Meetings</button>
    <DropDown isOpen={isOpen} setIsOpen={setIsOpen}> 
        <div className=' flex flex-col bg-red-700  ' >
          <input placeholder='room name' type="text" name="roomName" id="roomName" onChange={(e) => setRoomName(e.target.value)} />
            <button onClick={handleCreateRoom}>Create room</button>

            <input placeholder='roomId' type="text" name="roomName" id="roomName" onChange={(e) => setRoomId(e.target.value)} />
            <button onClick={handleJoinRoom}>Join Room</button>
            <Link to='/rooms'>Manage rooms</Link>
        </div>

    </DropDown>
    </div>

  )
}
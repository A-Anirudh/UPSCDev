import React, {useEffect,useMemo,useState} from 'react'
import {io} from 'socket.io-client'
import { DropDown } from '../Common/DropDown'
import { useNavigate } from "react-router-dom";


export const MeetingDropdown = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const username = userInfo.data.username

  const navigate = useNavigate()

  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_SOCKET_URL, {
        withCredentials: true,
      }),
    []
  );
    const [isOpen, setIsOpen] = useState(false)
    const [roomName, setRoomName] = useState('Study')
    const [roomId, setRoomId] = useState('')

    function handleCreateRoom() {
      socket.emit('create-room',roomName);
      console.log('room created with room name',roomName)
      setRoomName("")
    }

    function handleJoinRoom() {
      navigate(`room/${roomId}`)
      setRoomId("")
    }

    useEffect(() => {
      socket.on('send-message-to-self',(data) => {
        console.log(data)
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
            <button>Manage rooms</button>
        </div>

    </DropDown>
    </div>

  )
}
import React, {useEffect,useMemo,useState} from 'react'
import {io} from 'socket.io-client'
import { DropDown, Modal } from '../UIComponents'
import { Link, useNavigate } from "react-router-dom";
import { useLazyValidRoomQuery } from '../../slices/roomSlice';
import toast from "react-hot-toast";
import { AddIcon, KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '../../utils/icons';


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
      // handleOpen()
      socket.emit('create-room',roomName);
      // console.log('room create request was sent to backend socket, with room name',roomName)
      setRoomName("")
    }
                      
    async function handleJoinRoom() {
      // handleOpen()
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
const handleOpen=()=>{
  setIsOpen(!isOpen)
}

  return (
    <div className='z-[1000] relative ' >
    <button onClick={handleOpen} className='font-semibold hover:text-accent-500 flex items-center'>Meetings 
    <span className={`${isOpen?"rotate-180":"rotate-0"} flex duration-300`}> 
     <KeyboardArrowDownIcon/></span> </button>
     
    <DropDown isOpen={isOpen} setIsOpen={setIsOpen}> 
        <div className='hidden lg:flex flex-col  gap-2 p-3 rounded-lg bg-background-50 border border-background-200   ' >
          <div className='flex  gap-2 items-center justify-center '>
            <input placeholder='Room name...' className='px-4 py-2 rounded-md bg-background-1000 border border-background-200 outline-0' type="text" name="roomName" id="roomName" onChange={(e) => setRoomName(e.target.value)} />
            <button onClick={handleCreateRoom} className='bg-accent-500 hover:bg-accent-400 text-white px-4 py-2 rounded-md duration-200 flex items-center gap-1'>Create</button>
          </div>

          <div className='h-[1px] bg-background-200 w-full'></div>

            <div className='flex gap-2 items-center justify-center '>
            <input placeholder='Room Id' type="text" name="roomName" id="roomName" className='px-4 py-2 rounded-md bg-background-1000 border border-background-200 outline-0' onChange={(e) => setRoomId(e.target.value)} />
            <button onClick={handleJoinRoom} className='bg-accent-500 hover:bg-accent-400 text-white px-4 py-2 rounded-md duration-200 w-full'>Join</button>

            </div>
          <div className='h-[1px] bg-background-200 w-full'></div>
 
            <Link to='/manage-rooms' className='text-blue-600 text-center' onClick={handleOpen}>Manage rooms</Link>
        </div>

    </DropDown>

    <div className={`lg:hidden relative`}>
    <Modal open={isOpen} setOpen={setIsOpen}>
    <div className='flex flex-col  gap-2 p-3 rounded-lg bg-background-1000 border border-background-200  ' >
          <div className='flex  gap-2 items-center justify-center '>
            <input placeholder='Room name...' className='px-4 py-2 rounded-md bg-background-1000 border border-background-200 outline-0' type="text" name="roomName" id="roomName" onChange={(e) => setRoomName(e.target.value)} />
            <button onClick={handleCreateRoom} className='bg-accent-500 hover:bg-accent-400 text-white px-4 py-2 rounded-md duration-200 flex items-center gap-1'>Create</button>
          </div>

          <div className='h-[1px] bg-background-200 w-full'></div>

            <div className='flex gap-2 items-center justify-center '>
            <input placeholder='Room Id' type="text" name="roomName" id="roomName" className='px-4 py-2 rounded-md bg-background-1000 border border-background-200 outline-0' onChange={(e) => setRoomId(e.target.value)} />
            <button onClick={handleJoinRoom} className='bg-accent-500 hover:bg-accent-400 text-white px-4 py-2 rounded-md duration-200 w-full'>Join</button>

            </div>
          <div className='h-[1px] bg-background-200 w-full'></div>

          <Link to='/manage-rooms' className='text-blue-600 text-center' onClick={handleOpen}>Manage rooms</Link>
        </div>
    </Modal>
</div>

    </div>

  )
}
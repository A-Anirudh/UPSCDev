import React, {useState} from 'react'
import { DropDown } from '../Common/DropDown'

export const MeetingDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)


  return (
    <div className='z-[1000] relative w-[350px]' >
    <button onClick={() => setIsOpen(true)} >Meetings</button>
    <DropDown isOpen={isOpen} setIsOpen={setIsOpen}> 
        <div className=' flex flex-col bg-red-700  ' >
            <button>Create room</button>
            <button>Join Room</button>
            <button>Manage rooms</button>
        </div>

    </DropDown>
    </div>

  )
}
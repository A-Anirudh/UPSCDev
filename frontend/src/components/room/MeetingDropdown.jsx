import React, {useState} from 'react'
import { DropDown } from '../UIComponents'
import {Link} from 'react-router-dom'
import { AddIcon, KeyboardArrowDownIcon, LoginIcon, ManageIcon } from '../../utils/icons'

export const MeetingDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [open, setopen] = useState(false)


  return (
    <div className='relative'>
    <button onClick={() => setIsOpen(!isOpen)} className='font-semibold flex gap-1 items-center' onMouseEnter={() => setIsOpen(true)}
      >Meetings <KeyboardArrowDownIcon/></button>
    <DropDown isOpen={isOpen} setIsOpen={setIsOpen} onMouseLeave={()=>setIsOpen(false)}> 
        <div className=' flex flex-col   gap-3 p-2 ' >
            <button className='text-text-25 hover:text-text-25 flex items-center gap-2 hover:bg-accent-200 p-2 rounded duration-150'><AddIcon/>Create room</button>
            <Link to='/join' onClick={()=>setIsOpen(false)}  className='text-text-25 hover:text-text-25 flex items-center gap-2 hover:bg-accent-200 p-2 rounded duration-150'><LoginIcon />Join Room</Link>
            <Link to='/manage-rooms' onClick={()=>setIsOpen(false)} className='text-text-25 hover:text-text-25 flex items-center gap-2 hover:bg-accent-200 p-2 rounded duration-150'><ManageIcon />Manage rooms</Link>
        </div>

    </DropDown>


    </div>

  )
}
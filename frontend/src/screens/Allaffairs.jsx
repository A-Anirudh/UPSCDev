import React, { useEffect } from 'react'
import { AEReaderContainer, Affaircard, AllaffairsContainer, Sidebar } from '../components'

import { useState } from 'react';


import { useSelector } from 'react-redux';

const all=localStorage.getItem('all')

export const Allaffairs = () => {
  localStorage.setItem('affair-article',false)
  const open = useSelector((state) => state.open.isOpen)

const [isFirst, setisFirst] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('e-pid')){
        setisFirst(false)
    }
    return ()=>{
      // localStorage.setItem('all',true)
    }
}, [])
  return (
    <div className={`overflow-hidden flex flex-col h-screen  md:flex-row ${open?' ':' lg:justify-betwee'} transition-all bg-background-50 text-text-950 `}>
      <div className='md:max-w-[15rem]'><Sidebar /></div>
      <div className=' w-full h-screen overflow-auto pb-5 '>{localStorage.getItem('all') === 'true' && !localStorage.getItem('e-pid') ? <AllaffairsContainer /> : <AEReaderContainer key={localStorage.getItem('e-pid')} />}</div>
        
    </div>
  )
}

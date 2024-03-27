import React, { useEffect, useState } from 'react'
import BugReportIcon from '@mui/icons-material/BugReport';
import { useDispatch, useSelector } from 'react-redux';
import { setbugopen } from '../../slices/bugSlice';
import { Modal } from '../../utils/Modal';
import { ReportBug } from './ReportBug';
export const Bug = () => {

    // const isOpen=useSelector((state)=>state.bugOpen.isBugOpen)
    // const dispatch=useDispatch()
    // const onClick=()=>{
    //     dispatch(setbugopen(!isOpen))
    // }
    const [isOpen, setisOpen] = useState(false)

  return (
    <div className={`bg-r ed-500 fixed bottom-5 right-5 z-[9999] text-text-25 bg-background-100 rounded-full `}>
        <button className='p-3' onClick={()=>setisOpen(true)}><BugReportIcon/></button>
        <Modal open={isOpen} setOpen={setisOpen}>
          <ReportBug setOpen={setisOpen} open={isOpen}/>
        </Modal>
    </div>
  )
}


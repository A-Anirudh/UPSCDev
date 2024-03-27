import React, { useEffect } from 'react'
import {Link, useParams } from 'react-router-dom';
import { useUserVerifyEmailQuery } from '../slices/usersApiSlice'
import DoneIcon from '@mui/icons-material/Done';
export const VerifyEmail = () => {
    const {id,token}=useParams()
    const {data,isLoading,error}=useUserVerifyEmailQuery({
      id:id,
      token:token
    })

    useEffect(() => {
        
    }, [data,isLoading])
    
    
  return (
    <div className='flex h-screen bg-white items-center justify-center '>
        <div className=' p-10 rounded-lg flex flex-col items-center gap-4  w-[350px]'>
            <p className=' font-semibold flex items-center text-2xl'>Account Verified <DoneIcon className='ml-6 text-green-500'/></p>
            <Link to='/'className='bg-green-500 py-3 px-3 w-full rounded-md text-center font-[poppins] text-white'>Take me to login</Link>
        </div>
    
    </div>
  )
}

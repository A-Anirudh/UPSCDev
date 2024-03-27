import React from 'react'
import { ReaderSkeleton } from './'

export const AEReaderSkeleton = () => {
  return (
    <div className='p-4 h-screen w-full flex flex-col gap-10'>
            <div className='flex gap-4'>
                <div className='loader rounded w-28 py-5'></div>
                <div className='loader rounded w-28 py-5'></div>
            </div>
            <div className='loader w-full p-10 rounded'>
            </div>
            <ReaderSkeleton/>
    </div>
  )
}

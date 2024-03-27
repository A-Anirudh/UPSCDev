import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <section className='w-full h-[90vh] flex items-center justify-center'>
        <div className='text-center flex  flex-col gap-4 items-center'>
            <p className='font-bold text-8xl'>404</p><br />
            <p className='text-center text-4xl font-semibold text-background-700'>Page not found</p>
            <p>The page  you requested for could not be found</p>
            <Link to='/' className='bg-secondary-500 text-white hover:text-white px-4 py-2  rounded hover:bg-secondary-600 duration-200 w-max'>Go to homepage</Link>
        </div>
    </section>
  )
}

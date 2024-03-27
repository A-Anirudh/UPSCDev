import React from 'react'
import { ParaSkeleton } from './ParaSkeleton'

export const ReaderSkeleton = () => {
  return (
    <section className='p-2 md:p-12 overflow-y-auto  h-full sidebar'>
        <div className='flex items-center justify-center w-full'><p className='loader w-full md:w-1/2 p-8 rounded-2xl '></p></div>
        <div className='flex items-center justify-center w-full'><p className='loader w-3/4 md:w-1/4 mt-3 p-4 rounded-xl '></p></div>
        <article className='h-full flex flex-col gap-10 mt-5'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <ParaSkeleton />
          </div>
        ))}
        </article>

    </section>
  )
}

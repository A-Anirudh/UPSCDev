import React, { useEffect, useState,useRef  } from 'react'
import { useGetOneEventQuery } from '../../slices/eventSlice'
import { ReaderSkeleton } from '../../loaders'

export const EventReader = ({pid}) => {
  const [eventData, seteventData] = useState()
  const {data,isLoading}=useGetOneEventQuery(pid)
  useEffect( () => {
      if(data)  seteventData(data.data)
  }, [isLoading])

  if(!data) return <ReaderSkeleton/>
  return (
    <section className='p-2 md:p-12 overflow-y-auto  h-full sidebar'>
        <p className=' text-center font-semibold text-[2rem] md:text-[3rem]'>{eventData?.eventName}</p>
        <p className=' text-center font-semibold text-sm md:text-[1rem] flex justify-center gap-6 text-primary-600    '><span>{eventData?.startDate.slice(0,10)}</span>to<span>{eventData?.endDate.slice(0,10)}</span></p>
        <article className='h-full p-4 font-jakarta'>
          {eventData?.desc}
        </article>

    </section>
  )
}

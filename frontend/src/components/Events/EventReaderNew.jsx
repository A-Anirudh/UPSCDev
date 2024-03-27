import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ReaderSkeleton } from "../../loaders";
import { useGetOneEventQuery } from "../../slices/eventSlice";

export const EventReaderNew = () => {
  const [params, setparams] = useSearchParams();
  const pid = params.get("event");

  const [eventData, seteventData] = useState()
  const {data,isLoading}=useGetOneEventQuery(pid)
  useEffect( () => {
      if(data)  seteventData(data.data)
  }, [data,pid,isLoading])

  if(!data) return <ReaderSkeleton/>
  return (
    <section className='p-2 md:p-12 overflow-y-auto  h-full sidebar'>
        <p className=' text-center font-semibold text-[2rem] md:text-[3rem]'>{eventData?.eventName}</p>
        <p className=' text-center font-semibold text-sm md:text-[1rem] flex justify-center gap-6 text-primary-600    '><span>{eventData?.startDate.slice(0,10)}</span>{eventData?.endDate ? <span > <span className="pr-5">to</span> {eventData?.endDate?.slice(0,10)}</span>  : ''}</p>
        <article className='h-full p-4 font-jakarta'>
          {eventData?.desc}
        </article>

    </section>
  )
};

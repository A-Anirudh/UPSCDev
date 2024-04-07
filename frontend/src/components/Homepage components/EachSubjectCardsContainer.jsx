import React, { useEffect, useMemo, useState } from "react";
import { useGetAllSubjectWiseQuery } from '../../slices/affairSlice'
import { CardsContainer } from '../Common/CardsContainer'


export const EachSubjectCardsContainer = ({subject,isCurrentAffair}) => {
  const {data,error,refetch,isLoading}=useGetAllSubjectWiseQuery({subject:subject,isCurrentAffair:isCurrentAffair})
  const [allData, setallData] = useState([])

  useEffect(() => {
    if(data){
      setallData(data.allDataPerSubject)
    }
  }, [data,isLoading])







  // Effect to update favorites and affairs data


  

    // Helper function to check if an affair is a favorite

    



  
  return (
    <div className='xl:w-3/4 h-full mx-auto'>
      <section className='p-4 md:px-10 md:py-3 rounded my-2 text-text-25 w-full'>
      <p className="md:text-3xl text-2xl font-semibold my-1 mb-10">
       {subject}
      </p>
        <CardsContainer data={allData} />
      </section>
    </div>
  )
}

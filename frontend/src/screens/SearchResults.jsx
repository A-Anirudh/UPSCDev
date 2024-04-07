import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useSearchResultsQuery } from "../slices/affairSlice";
import { useDispatch, useSelector } from 'react-redux';
import { SearchCard } from "../components";


export const SearchResults = () => {
  const { searchItem } = useParams()||"jk";
  const [results, setresults] = useState([])
  const {data,error,isLoading}=useSearchResultsQuery(searchItem)
  const l=useSelector(state=> (state))

  useEffect(() => {
    if(data){
        console.log(data,error)
        setresults(data,error)

    }

  }, [data])


  console.log(searchItem)
  return <section className="xl:w-3/4 h-full mx-auto md:p-5  bg-red -900 ">
    <p className="text-xl p-4 md:px-10 md:py-5 font-light text-background-900">Showing Results of 
    <span className="font-semibold text-text-25">{" "+searchItem}</span></p>
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-7   gap-2 p-4 md:pl-10 flex-col md:flex-row  w-full  ">
        {results?.map((item,idx)=>(
            <div key={idx} className="">
                <SearchCard item={item} />
                {/* {JSON.stringify(item)} */}
            </div>
        ))}
    </section>
    
    
  </section>;
};

import React, { useEffect, useMemo, useState } from "react";
import { useGetCASubjectWiseQuery } from "../../slices/affairSlice";
import { useNavigate } from "react-router-dom";
import { CategoryCardsContainer } from "../Homepage components/CategoryCardsContainer";
import { RightIcon } from "../../utils/icons";


export const AllAffairsContainerNew = ({ isFavourite, myFavs, handleFav }) => {
  const { data, isLoading, error, refetch } = useGetCASubjectWiseQuery();
  const [allAffairs, setallAffairs] = useState({});
  const navigate=useNavigate()

  useEffect(() => {
    if (data) {
      setallAffairs(data.subjectWiseData);
      // console.log(data.subjectWiseData);
    }
  }, [data, isLoading]);

  const handleViewAll=(subject)=>{
    navigate(`/affairs/all?subject=${subject}&currentAffair=true`)
  }
  return (
    <div className={`xl:w-3/4 h-full mx-auto `}>
    <div className="p-4 md:px-10 md:py-5 rounded my-2 text-text-25 w-full">
       <p className="md:text-4xl text-2xl font-semibold my-5 ">Current affairs</p>
      {Object.keys(allAffairs).map((category, idx) => (
        <section key={idx} className="  flex flex-col w-full gap-2 ">
          <section>
            <div className="flex items-center gap-2 my-4">
              <p className="text-lg md:text-2xl pb-1 ">
                {category}
              </p>
              <button className="flex items-center text-background-500 hover:text-background-700" onClick={()=>handleViewAll(category)}>View all <span className="flex"><RightIcon/></span></button>
            </div>
            <CategoryCardsContainer
              key={idx}
              category={category}
              cards={allAffairs[category]}
              isFavourite={isFavourite}
              myFavs={myFavs}
              handleFav={handleFav}
            />
          </section>
        </section>
      ))}
    </div>
    </div>
  );
}



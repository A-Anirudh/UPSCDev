import React, { useEffect, useState } from "react";
import {
  useGetLatestCAQuery,
  useGetNonCAQuery,
} from "../../slices/affairSlice";
import { CategoryCardsContainer } from "./CategoryCardsContainer";
import { RightIcon } from "../../utils/icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export const NonCAContainer = ({ isFavourite, myFavs, handleFav }) => {
  const { data, isLoading, error, refetch } = useGetNonCAQuery();
  const [allAffairs, setallAffairs] = useState({});
  const navigate=useNavigate()

  useEffect(() => {
    if (data) {
      setallAffairs(data.subjectWiseData);
      // console.log(data.subjectWiseData);
    }
  }, [data, isLoading]);

  const handleViewAll=(subject)=>{
    navigate(`/affairs/all?subject=${subject}&currentAffair=false`)
  }
  return (
    <section>
      {Object.keys(allAffairs).map((category, idx) => (
        <section key={idx} className=" p-5 flex flex-col w-full gap-2">
          <section>
            <div className="flex items-center gap-2">
              <p className="text-lg md:text-3xl  font-semibold  my-4">
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
    </section>
  );
};

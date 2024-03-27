import React, { useEffect, useState } from "react";
import { useGetLatestCAQuery } from "../../slices/affairSlice";
import { CategoryCardsContainer } from "./CategoryCardsContainer";
import { RightIcon } from "../../utils/icons";
import { useNavigate } from "react-router-dom";

export const CAContainer = ({ isFavourite, myFavs, handleFav }) => {
  const { data, isLoading, error, refetch } = useGetLatestCAQuery();
  const [allAffairs, setallAffairs] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    if (data) {
      setallAffairs(data.data);
      // console.log(data.data);
    }
  }, [data, isLoading]);
  return (
    <div className=" p-5 flex flex-col w-full gap-2">
      <div className="flex items-center gap-2">
        <p className="text-lg md:text-3xl pb-1 font-semibold">
          Current Affairs
        </p>
        <button className="flex items-center text-background-500 hover:text-background-700"
        onClick={()=>navigate("/affair")}
        >
          View all{" "}
          <span className="flex">
            <RightIcon />
          </span>
        </button>
      </div>
      <CategoryCardsContainer
        cards={allAffairs}
        isFavourite={isFavourite}
        myFavs={myFavs}
        handleFav={handleFav}
      />
    </div>
  );
};

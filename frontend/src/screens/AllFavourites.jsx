import React, { useEffect, useState } from "react";
import { Collections, FavAffairCard, Sidebar } from "../components";
import { useGetAllFavQuery } from "../slices/favouriteSlice";
import { useSelector } from "react-redux";
import { FavouritesSkeleton } from "../loaders";

export const AllFavourites = () => {
  const { data, error, isLoading, refetch } = useGetAllFavQuery(    {},
    { refetchOnMountOrArgChange: true });
  const [allFav, setAllFav] = useState([]);
  const [noFav, setnoFav] = useState(true);

  useEffect(() => {
    if (data) {

      setAllFav(data.data);
      setnoFav(false)
      if (data?.data === "No data found") setnoFav(true);

    }
    else if (error) 
    {
      console.log(error)
      }
    return () => {

      // setAllFav([])
    };
  }, [data,allFav,isLoading]);



  if (isLoading || allFav.length == 0) {
    return <FavouritesSkeleton />;
  }
  if(!allFav){
    return 'loading'
  }


  return (
    <div className={`xl:w-3/4 h-full mx-auto`}>
      <Collections />
      {noFav ? (
        <section className="p-4 md:p-10 flex flex-col w-full text-text-950">
          <p className=" font-bold text-text-950 text-[2rem]">
            {"No liked affairs"}
          </p>
        </section>
      ) : (
        <section className="p-4 md:px-10 md:py-5 flex flex-col w-full ">
          <p className=" md:text-3xl text-2xl font-semibold ">Liked</p>
          <section
            className={`grid  py-5 
            grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-7
            
          `}
          >
            {allFav?.map((item, i) => (
              <FavAffairCard
                key={item?.pid}
                affairName={item?.affairName}
                fav_pid={data?.data[i]?.pid}
                article={item?.article}
                tags={item?.tags}
                pid={item?.pid}
                _id={item?.affairId}
                thumbnail={item?.thumbnail}
                refetch={refetch}
              />
            ))}
          </section>
        </section>
      )}
    </div>
  );
};
//

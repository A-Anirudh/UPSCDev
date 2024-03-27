import React, { useEffect, useState } from "react";
import { Collections, FavAffairCard, Sidebar } from "../components";
import { useGetAllFavQuery } from "../slices/favouriteSlice";
import { useSelector } from "react-redux";
import { FavouritesSkeleton } from "../loaders";


export const AllFavourites = () => {
  const [favListChanged, setFavListChanged] = useState(Math.random());
  const { data, refetch, error, isLoading } = useGetAllFavQuery(
    {},
    { refetchOnMountOrArgChange: favListChanged }
  );
  const [allFav, setAllFav] = useState([]);
  const [height, setHeight] = useState(window.innerHeight);
  const open = useSelector((state) => state.open.isOpen); 
  const [noFav, setnoFav] = useState(false);

  useEffect(() => {
    refetch();
    if (!error) {
      if (data) setAllFav(data?.affairs);
      if (data?.data === "No data found") setnoFav(true);
    }
  }, [favListChanged, data]);

  if (isLoading && allFav.length == 0) {
    return <FavouritesSkeleton />;
  }

  return (
    <div
      className={`xl:w-3/4 h-full mx-auto`}
    >
      <Collections/>
      {noFav ? (
        <section className="p-4 md:p-10 flex flex-col w-full text-text-950">
          <p className=" font-bold text-text-950 text-[2rem]">
            {"No liked affairs"}
          </p>
        </section>
      ) : (
        <section className="p-4 md:px-10 md:py-5 flex flex-col w-full ">
          <p className=" md:text-3xl text-2xl font-semibold ">
            Liked
          </p>
          <section
            className={`grid  py-5 
            grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-7
            
          `}
          
          >
            {allFav.map((item, i) => (
              <FavAffairCard
                key={item?.pid}
                affairName={item?.affairName}
                fav_pid={data?.data[i]?.pid}
                article={item?.article}
                tags={item?.tags}
                pid={item?.pid}
                _id={item?._id}
                setFavListChanged={setFavListChanged}
                thumbnail={item?.thumbnail}
              />
            ))}
          </section>
        </section>
      )}
    </div>
  );
};
//

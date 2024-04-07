import React, { useEffect } from "react";
import { Affaircard } from "..";
import { useState } from "react";
import { useGetAffairsQuery } from "../../slices/affairSlice";

import { useSelector } from "react-redux";
import { useIsSubQuery, useLazyIsSubQuery } from "../../slices/usersApiSlice";
import { AllAffairsSkeleton } from "../../loaders";

export const AllaffairsContainer = () => {
  const [ispro, setispro] = useState(false);
  const [allAffairs, setallAffairs] = useState();
  const [allAffairsCopy, setallAffairsCopy] = useState([]); // Initialize with an empty array
  const [show, setShow] = useState(false);
  const [favListChanged, setFavListChanged] = useState(123);
  const open = useSelector((state) => state.open.isOpen);



  const isSubIni = useIsSubQuery();
  const [height, setheight] = useState(window.innerHeight);
  let affairs = useGetAffairsQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (affairs.data) {
      
      setallAffairs(affairs.data.data);
      setallAffairsCopy(affairs.data.data); // Initialize allAffairsCopy with the actual data
    }
  }, [affairs]);

  useEffect(() => {
    refetch();
  }, [favListChanged]);

  useEffect(() => {
    if (isSubIni) {

      setispro(isSubIni?.data?.data)
    }
  }, [isSubIni, ispro]);






  useEffect(() => {}, [error]);

  if ( !allAffairs) {
    return <AllAffairsSkeleton/>
  }

  
  return (
    <div className=" p-1 md:p-4 md:w-[100%] flex flex-col items-center gap-4 ">
      <p className="self-start font-jakarta font-medium  text-[1.5rem] md:text-[2.1rem]">
        All Current Affairs
      </p>
      <div className="flex  flex-col  z-1 w-full items-center justify-center font-jakarta">
        {ispro ? (
          <input
            type="search"
            className=" bg-background-100 md:w-[50%] w-full p-3 px-5 rounded-3xl round    outline-none   "
            placeholder="Search..."
            onChange={(e) => handleSearch(e)}
          />
        ) : (
          <input
            type="search"
            className=" bg-background-100  md:w-[50%] w-full p-3 px-5 rounded-3xl round    shadow-sm   outline-none"
            placeholder="Search ...Only for premium members..."
            disabled
            onMouseOver={handleDisabled}
          ></input>
        )}
      </div>
      <section
            className={`sidebar grid overflow-auto p-1 md:p-3
            grid-cols-1 gap-4 pb-12 
            ${open?"sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-6":"sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"}
          `}
            style={{ maxHeight: `${height - 150}px` }}
          >
        {allAffairsCopy.map((item) => (
          <Affaircard
            setFavListChanged={setFavListChanged}
            key={item.pid}
            affairName={item.affairName}
            article={item.article}
            tags={item.tags}
            pid={item.pid}
            _id={item._id}
            thumbnail={item.thumbnail}
          />
        ))}
      </section>
    </div>
  );
};

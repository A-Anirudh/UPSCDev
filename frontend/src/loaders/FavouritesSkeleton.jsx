import React, { useState } from "react";
import { Sidebar } from "../components";
import { CardSkeleton } from "./CardSkeleton";
import { useSelector } from "react-redux";

export const FavouritesSkeleton = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const open = useSelector((state) => state.open.isOpen); 

  return (
    <div className="flex flex-col md:flex-row   w-[100%] bg-background-25">
      <div>
        <Sidebar />
      </div>
      <section className="p-4 md:p-10 flex flex-col w-full ">
        <p className=" font-bold text-text-950 text-[2rem]">
          My favourites
        </p>
        <section
          className={`sidebar grid overflow-auto p-5 
            grid-cols-1 gap-4 
            
            ${
              open
                ? 'sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-6'
                : 'sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'
            }
          `}
          style={{ maxHeight: `${height - 100}px` }}
        >
          {Array.from({ length: Math.ceil(height/100) }).map((_, index) => (
            <div key={index}>
                <CardSkeleton/>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

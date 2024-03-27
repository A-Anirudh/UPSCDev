import React, { useState } from "react";
import { CardSkeleton } from "./CardSkeleton";
import { useSelector } from "react-redux";

export const AllAffairsSkeleton = () => {
  const [height, setheight] = useState(window.innerHeight);
  const open = useSelector((state) => state.open.isOpen);
  return (
    <div className=" p-4 md:p-10 md:w-[100%] flex flex-col items-center gap-4 ">
      <p className="self-start  font-medium  text-[1.5rem] md:text-[2.1rem]">
        All Current Affairs
      </p>
      <div className="flex  flex-col  z-1 w-full items-center justify-center ">
        <div className="p-6 rounded-full loader w-1/2">

        </div>
      </div>
      <section
        className={`sidebar grid overflow-auto p-5 
            grid-cols-1 gap-4 
            
            ${
              open
                ? "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-6"
                : "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
            }
          `}
        style={{ maxHeight: `${height - 100}px` }}
      >
        {Array.from({ length: Math.ceil(height / 60) }).map((_, index) => (
          <div key={index}>
            <CardSkeleton />
          </div>
        ))}
      </section>
    </div>
  );
};

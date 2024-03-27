import React, { useState } from "react";
import { Sidebar } from "../components";
import { useSelector } from "react-redux";
import { CardSkeleton } from "./CardSkeleton";

export const MainpageSkeletion = () => {
  const [height, setheight] = useState(window.innerHeight);
  const open = useSelector((state) => state.open.isOpen); 

  return (
    <div className="flex flex-col md:flex-row   w-[100%] bg-background-25">
      <div>
        <Sidebar />
      </div>
      <div className="w-full flex md:flex-row flex-col h-[89vh] sm:max-h-[90dvh] md:min-h-screen md:justify-end p-1 ">
      <section className="md:pb-8 flex flex-col w-full ">
        <div>
          <p className="flex items-center  gap-4  font-bold text-text-950  text-[1.5rem] md:px-10 md:mt-10 px-4">
            Welcome{' '}
            <span className="text-accent-500 loader w-[200px] py-3 rounded-md">
            </span>
          </p>
        </div>
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
          {Array.from({ length: Math.ceil(height/60) }).map((_, index) => (
            <div key={index}>
                <CardSkeleton/>
            </div>
          ))}
        </section>
      </section>
    </div>
    </div>
  );
};

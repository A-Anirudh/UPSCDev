import React from "react";
import { useSelector } from "react-redux";
import { Sidebar } from "../components";

export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row   w-[100%] bg-background-25">
      <div>
        <Sidebar />
      </div>
      <section className="w-full h-full  p-4 md:p-10 overflow-auto sidebar flex flex-col justify-between text-text-25">
        <div>
          <div className="flex items-center justify-between w-full ">
          <p className=" font-semibold  text-3xl md:text-[3rem] ">
              Profile
            </p>

            <div className="flex items-center ">
              <button className="loader px-6 w-28 py-6 rounded-full"></button>
            </div>
          </div>
            <div className="image h-32 w-32 mt-5 loader rounded-full"></div>

          <div className="flex w-full justify-start xl:items-center gap-10 lg:flex-row flex-col ">
            <div className="w-full max-h-full overflow-auto  p-4 my-4 flex flex-col gap-4  lg:w-[50%]">
              {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex flex-col gap-2'>
                <div className="loader p-2 rounded-lg w-1/4"></div>
                <div className="loader p-5 rounded-sm"></div>
            </div>
          ))}
            </div>

            <div className="p-4 rounded-sm bg-background-10 0  w-full lg:w-[50%] ">
            <p className=" font-semibold  text-3xl md:text-[2rem]">
                Select your avatar
              </p>
              <div className="flex md:gap-6 p-2 gap-3 md:p-3 mt-2  flex-wrap items-center justify-center w-full">
              {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className='flex flex-col gap-2'>
                <div className="loader w-12 xl:w-20 rounded-[50%] aspect-square"></div>

            </div>
          ))}
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

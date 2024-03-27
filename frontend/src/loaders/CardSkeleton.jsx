import React from "react";

export const CardSkeleton = () => {
  return (
    <div
      className={` bg-background-1000  rounded-lg flex z-[0] flex-col  flex-auto
    w-full h-[320px]
    drop-shadow-md hover:scale-[1.01] transition-transform ease-in-out  aspect-video	`}
    >
      <div className="w-full h-[50%] loader rounded-t-md"></div>

      <div className="h-1/2   w-full rounded-b-lg p-5 flex flex-col items-start justify-between  ">
        <p className=" text-text-25  font-semibold text-[1.2rem] cursor-pointer line-clamp-1 loader p-3 rounded-sm w-full"></p>
        <p className="font-jakarta font-light text-[0.79rem] text-text-1000 loader p-2 rounded-sm w-3/4"></p>

        <div className="flex items-center justify-between w-full ">
          <button className="text-text-25 font-[inter] font-light text-[0.72rem] bg-accent-100 flex items-center px-4 py-4 loader  rounded-sm w-1/2  gap-2 hover:bg-accent-200 transition-colors ease-in-out"></button>
          <div>
            <button className="px-4 py-4 loader rounded-sm "></button>
          </div>
        </div>
      </div>
    </div>
  );
};

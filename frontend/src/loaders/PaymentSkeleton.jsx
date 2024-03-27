import React from "react";


export const PaymentSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row   w-[100%] bg-background-25">

      <div className="w-full h-screen flex  justify-center lg:px-[15%] md:px-16 px-2 text-text-25 font-jakarta  ">
        <div className=" w-full">
          <div className="w-full flex flex-col gap-2">
            <div className="w-1/2 loader h-8 rounded-md mt-10"></div>
            <div className="w-1/4 loader h-5 rounded-md "></div>
          </div> 
          <div className=" loader p-5 rounded h-24 w-full mt-10 flex items-center  justify-end">

          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';
export const DailyQuizSkeleton = () => {
  return (

    <div className="bg-re d-500 w-full h-full flex items-center justify-center text-text-25">
      <div className="bg-background-1000 rounded w-full">
        <div className="w-full border-b flex items-center justify-between border-gray-500">
          <p className="p-5 text-2xl font-semibold font-jakarta"> Daily quiz</p>
          <button className="p-5" >
            <CloseIcon className="text-background-500" />
          </button>
        </div>

        <div className="p-5">
          <p className="loader  w-3/4 p-3 rounded-md"></p>
          <ul className="bg-background-50 rounded-md p-5 flex flex-col gap-4">
            <div className="flex gap-2"><div className="loader rounded-full p-3"></div><p className="loader  w-1/4 p-3 rounded-md"></p></div>
            <div className="flex gap-2"><div className="loader rounded-full p-3"></div><p className="loader  w-1/4 p-3 rounded-md"></p></div>
            <div className="flex gap-2"><div className="loader rounded-full p-3"></div><p className="loader  w-1/4 p-3 rounded-md"></p></div>
            <div className="flex gap-2"><div className="loader rounded-full p-3"></div><p className="loader  w-1/4 p-3 rounded-md"></p></div>

        
            <button className="loader p-5 w-1/6 rounded-md" >
              
            </button>

          </ul>

        </div>
      </div>
    </div>

  )
}

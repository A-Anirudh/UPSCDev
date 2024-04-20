import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
export const Modal = ({open,setOpen,children}) => {
  return (
    <div className="w-full">
      <div
        className={`fixed top-0 left-0 w-full h-full  flex items-center justify-center  z-[99999] ${
          open ? "opacity-100" : "opacity-0"
        } ${open ? "visible" : "invisible"} backdrop-blur-sm`}
        onClick={() => setOpen(!open)}
      ></div>
      <div
        className={`fixed   top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 z-[99999]   rounded-lg ${
          open ? "block" : "hidden"
        } `}
      >
        
        
        {children}
        

      </div>
    </div>
  );
};

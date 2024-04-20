import React, { useState } from "react";
export const Modal = ({ open, setOpen,direction ,children }) => {
  return (
    <div
    onClick={()=>setOpen(false)}
    className={`
      fixed inset-0 flex   transition-colors z-[10000] 
      ${open ? "visible bg-black/10 backdrop-blur-sm" : "invisible"}

      ${direction?direction :"items-center justify-center"}

    `}
  >
    {/* modal */}
    <div
      onClick={(e) => e.stopPropagation()}
      className={`
         rounded-xl   transition-all relative
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `}
    >
      {children}
    </div>
  </div>
  );
};
//justify-center items-center
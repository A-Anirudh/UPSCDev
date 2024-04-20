import React, { useEffect, useRef } from "react";

export const DropDown = ({ isOpen, setIsOpen, width,onMouseLeave, children }) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    
    <div className="  " ref={dropdownRef} onMouseLeave={onMouseLeave}>
      {isOpen ? (
        <div
          className={`fixed top-[75px] left-0 w-full h-full  bg-black/5  justify-center   ${
            isOpen ? "opacity-100" : "opacity-0"
          } ${isOpen ? "visible" : "invisible"} backdrop-blur-sm `}
          onClick={() => setIsOpen(false)}
        >
        </div>
      ) : null}
      <div
        className={`${
          isOpen ? "absolute" : "hidden" 
        } z-[1000] shadow-md mt-2 left-0 min-w-max  overflow-hidden   bg-background-1000 border border-background-100 rounded-lg `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {children}
      </div>
    </div>
  );
};



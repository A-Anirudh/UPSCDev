import React, { useEffect, useRef } from "react";

export const DropDown = ({ isOpen, setIsOpen, width,onMouseLeave, children }) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    console.log(isOpen)
    document.addEventListener("mousedown", handleClickOutside);
    if(!isOpen)
    document.removeEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    
    <div className="" ref={dropdownRef} onMouseLeave={onMouseLeave}>
      <div
        className={`${
          isOpen ? "absolute " : "hidden " 
        } z-[200] absolute overflow-auto left-0 mt-3 duration-200 `}

      >
        {children}
      </div>
    </div>
  );
};



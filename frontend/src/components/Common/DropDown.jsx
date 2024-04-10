import React, { useEffect, useRef } from "react";

export const DropDown = ({ isOpen, setIsOpen, children }) => {
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
    <div className="r elative" ref={dropdownRef}>
      {isOpen ? (
        <div
          className={`fixed top-[75px] left-0 w-full h-full  bg-black/5  justify-center   ${
            isOpen ? "opacity-100" : "opacity-0"
          } ${isOpen ? "visible" : "invisible"} backdrop-blur-sm `}
          onClick={() => setIsOpen(false)}
        >
        </div>
      ) : null}
      {isOpen ? (
        <div className="absolute z-10 mt-2 rounded-md p-3 w-full origin-top-right bg-background-1000 border border-background-100">
          {isOpen && children}
        </div>
      ) : null}
    </div>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowDownIcon,KeyboardArrowUpIcon,LockIcon } from "../../utils/icons";

export const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
const navigate=useNavigate()
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="py-2  rounded-md p-4 shadow-md bg-background-1000">
    <button
      className="accordion-title w-full text-left p-2 rounded-md flex items-center justify-between"
      onClick={toggleAccordion}
    >
      <p className="text-xl font-jakarta font-semibold">{title}</p>
      {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </button>

    <div
      className={`grid overflow-hidden transition-all duration-700 ease-in-out  ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden ">
        <div
          className={`accordion-content p-4  ${
            isOpen ? "border-t" : ""
          } w-full`}
        >
          <div>
            {content || (
              <div className="flex  items-center gap-4">
                <LockIcon />
                {"Buy premium to unlock summary"}
                <button
                  className="bg-primary-500 text-white px-5 py-2 rounded-lg hover:bg-primary-600 disabled:bg-primary-100 disabled:cursor-not-allowed"
                  onClick={() => {
                    navigate("/buy-subscription");
                  }}
                >
                  Buy subscription
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};


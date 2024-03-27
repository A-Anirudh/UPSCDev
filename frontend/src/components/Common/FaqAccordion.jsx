import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

export const FaqAccordion = ({ className,children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Find title and content from children
  const title = React.Children.toArray(children).find(
    (child) => child.type === AccordionTitle
  );
  const content = React.Children.toArray(children).find(
    (child) => child.type === AccordionContent
  );

  return (
    <div className={className}>
      <button
        className="accordion-title w-full text-left p-2 rounded-md flex items-center justify-between"
        onClick={toggleAccordion}
      >
        {title}
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
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

// Title component
export const AccordionTitle = ({ children, className }) => {
  return <p className={` ${className}`}>{children}</p>;
};

// Content component
export const AccordionContent = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

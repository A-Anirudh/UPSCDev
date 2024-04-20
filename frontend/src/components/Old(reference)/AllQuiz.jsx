import React, { useState } from "react";
import { Popover } from "../UIComponents";

import { useDispatch, useSelector } from "react-redux";
import SchoolIcon from "@mui/icons-material/School";
import { setdailyquizopen } from "../../slices/quizOpenSlice";
export const AllQuiz = () => {
  const open = useSelector((state) => state.quizOpen);
  const dispatch = useDispatch();
  const sideopen = useSelector((state) => state.open.isOpen);

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  return (
    <div
      className={`${
        sideopen ? "w-full " : "w-14 self-center"
      } p-2 md:py-3 px-4 flex gap-6  rounded-md  items-center transition-all relative `}
      onClick={() => setPopoverOpen(true)}
      onMouseEnter={togglePopover} // Add onMouseEnter event
      onMouseLeave={togglePopover} // Add onMouseLeave event
    >
      <SchoolIcon />
      <p className={`${sideopen ? "block" : " hidden"} text-text-950`}>
        Quizzes
      </p>
      {isPopoverOpen && sideopen && (
        <Popover>
          <button
            className="p-2 w-full"
            onClick={() => dispatch(setdailyquizopen(true))}
          >
            <p className={`${sideopen ? "block" : " hidden"} text-text-950 `}>
              Daily quiz
            </p>
          </button>

          <button
            className=" p-2 w-full"
          >
            <p className={`${sideopen ? "block" : " hidden"} text-text-950`}>
              Weekly quiz
            </p>
          </button>
        </Popover>
      )}
    </div>
  );
};

import React from "react";

export const TimelineCard = ({
  pid,
  _id,
  eventName,
  startDate,
  endDate,
  onClick,
}) => {
  const handleClick = async () => {
    localStorage.setItem("event-id", _id);
    localStorage.setItem("first", false);

    if (onClick) {
      onClick(pid);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative  mb-2 cursor-pointer  flex justify-between items-center border-b  w-[320px] snap-both"
    >
      <div className="absolute -bottom-2 left-1/2  bg-primary-500 rounded-full h-4 w-4 " />
      <div className="mb-3 p-4 mr-2  rounded-md w-full">
        <p className=" text-md font-semibold line-clamp-1">
          {eventName}
        </p>
        <p className=" text-sm text-text-800">
          {startDate.slice(0, 10)}
        </p>
      </div>
    </div>
  );
};

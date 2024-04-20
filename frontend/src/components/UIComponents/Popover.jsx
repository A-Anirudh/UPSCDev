import React from "react";

export const Popover = (props) => {
  return (
    <div className="z-[200] absolute overflow-auto w-[350px]  flex flex-col gap-3  flex-wrap top-11 -left-[100%]   xl:left-1/2 transform -translate-x-[300px] xl:-translate-x-0 bg-background-1000 px-7 py-5 shadow-md rounded-md">
      {props.children}
    </div>
  );
};

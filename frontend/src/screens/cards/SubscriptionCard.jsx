import React from "react";
import {
  CloseIcon,
  DoneIcon,
  DoneSmallIcon,
  RupeeIcon,
} from "../../utils/icons";

export const SubscriptionCard = ({
  open,
  setOpen,
  featureConfig,
  isPro,
  title,
  description,
  price,
  offer,
  oldPrice,
  percentage,
  tc,
  time
}) => {
  const features = [
    " Access to all current affairs",
    "Search affairs",
    "Search events",
    "Summerize events",
    "No Ads",
    "Daily news update",
    "Recite the article",
  ];


  return (
    <div
      className={`p-7 rounded-md  duration-150  w-full lg:w-[350px] hover:scale-[1.01] ${
        isPro
          ? "border-2 border-accent-500 hover:border-accent-400"
          : "border-2 border-gray-300 hover:border-accent-400"
      }`}
    >
      <div className=" text-center space-y-5  pb-7">
        <p className="font-extrabold text-3xl ">{title}</p>
        <p className="text-md font-semibold text-background-400">
          {description}
        </p>
        <p>
            <span></span>
        <span></span>
        </p>
        <p className="text-center flex items-baseline justify-center text-primary-700">
          <span className="flex">
            <RupeeIcon />
          </span>
          <span className="text-5xl font-bold ">{price}</span>
          <span className="text-xl">{time}</span>
        </p>
        <button className="bg-accent-600 text-white  w-full py-2 px-4 rounded-full pb-[0.75rem] font-semibold duration-150  hover:bg-accent-700 hover:shadow" onClick={setOpen}>
          Buy Now
        </button>
        {tc ? <p>{tc}</p> : null}
      </div>
      <span
        className="flex w-full bg-gradient-to-r from-gray-100 via-primary-300 to-gray-100 text-white 
      font-semibold rounded p-[1px]"
      ></span>

      <div>
        <p className="text-2xl font-bold py-5">Features</p>
        <div className="">
          {features.map((item, idx) => (
            <div className="flex gap-5 ">
              <span className={` `}>
                {isPro || featureConfig[idx] ? (
                  <span className="text-sm text-green-500  ">
                    <DoneIcon />
                  </span>
                ) : (
                  <span className="flex text-red-500">
                    <CloseIcon />
                  </span>
                )}
              </span>
              <p className={`text-md ${isPro || featureConfig[idx] ?'font-bold':'text-gray-600 font-light'}`}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useCancelSubscriptionMutation } from "../../slices/subscriptionSclice";

export const FinalCancel = ({ allClose }) => {
    const [cancelSub] = useCancelSubscriptionMutation();
    const [loading, setloading] = useState(false)
    const handleCancel = async () => {
        setloading(true)
        const { data } = await cancelSub();
        if (data) {
          window.location.reload();
          setloading(false)
        }
      };
  return (

      <div className=" mx-auto w-[300px] bg-background-1000 px-6 py-4  h-auto  rounded-md drop-shadow-2xl flex flex-col gap-4">
        <p className="">Proceed with cancellation ?</p>
        <div className="flex flex-col w-full items-center gap-2">

          <div className="w-full flex items-center flex-wrap gap-2">
          <button className="border border-accent-500 rounded -full hover:bg-accent-500  py-2 w-full flex-grow hover:text-white disabled:cursor-not-allowed"  disabled={loading} onClick={handleCancel}>
            {loading?"Loading...":'Proceed'}
          </button>          
          
          <button className="text-white bg-red-500 rounded -full hover:bg-red-500  py-2 w-full flex-grow" onClick={allClose}>
            Cancel
          </button></div>
        </div>
      </div>
    
  );
};

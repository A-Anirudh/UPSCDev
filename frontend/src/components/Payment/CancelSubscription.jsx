import React, { useState } from "react";
import { FinalCancel } from "..";
import { Modal } from "../UIComponents";

export const CancelSubscription = ({ open, handleOpen }) => {
    const features = [
        'Search affairs',
        'Search events',
        'Summerize events',
        'No Ads',
        'Highlight part of article',
        'Daily news update',
        'Recite the article'
      ];
      const [openFinal, setopenFinal] = useState(false)
      const handleOpenFinal=()=>{
        
        setopenFinal((cur)=>!cur)
        
      }
  return (
<>
      <div className=" mx-auto w-[350px]  bg-background-1000 px-6 py-8  h-auto  rounded-md shadow-md  flex flex-col gap-7 text-sm md:text-normal">
        <p className="text-xl font-semibold border-b pb-2">Cancel Membership</p>
        <p className="">You will lose all Premium benefits if you cancel</p>

        <div className="bg-b lue-800 p-5">
        <p className=" font-jakarta font-semibold text-lg">Premium features you will lose </p>

            <ul>
                {features.map((item,i)=>(
                    <li key={i} className="font-light">{item}</li>
                ))}
            </ul>
        </div>

        <div className="flex w-full items-center gap-6">
          <button className="bg-primary-500 px-4 py-2 rounded-full text-white pb-[0.59rem]" onClick={handleOpen}>
            Don't cancel
          </button>

          <button className="border px-4 py-2 rounded-full hover:bg-background-200" onClick={handleOpenFinal}>
            Next
          </button>
        </div>
      </div>
      <Modal open={openFinal} setOpen={handleOpenFinal}>
          <FinalCancel  allClose={handleOpen}/>
      </Modal>
      
   </>
  );
};

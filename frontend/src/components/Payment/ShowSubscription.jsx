import React, { useState } from "react";
import {
  
  useLazyGetSubscriptionDetailsQuery,
} from "../../slices/subscriptionSclice";
import { CancelSubscription } from "..";
import toast from "react-hot-toast";
import { Modal } from "../../utils/Modal";


export const ShowSubscription = () => {

  const [isopen, setisopen] = useState(false);
  const [open, setopen] = useState(false);
  const [paymentDetails, setpaymentDetails] = useState(  );
  const [getPaymentInfo] = useLazyGetSubscriptionDetailsQuery();


  const handleOpen = () => {
    setopen((cur) => !cur);
    

    
  };

  const convertEpochToDate=(epochTimestamp) =>{
    const date = new Date(epochTimestamp * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ('0' + date.getDate()).slice(-2);
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }
  const handleShowDetails = async () => {
    setisopen((cur) => !cur);
    if (!isopen) { 
      const { data,error,isLoading } = await getPaymentInfo();
      setpaymentDetails(data?.message)
      if(error){
        toast.error('Error Occured retriving payment details')
      }
    }


  };

  return (
   
      <div className=" w-full font-jakarta ">
        <div className="flex flex-col  py-10 ">
          <p className="text-2xl  font-semibold ">Subscriptions</p>
          <p className="text-text-1000 font-light text-sm">
            UpscMax Monthly subscription details
          </p>
        </div>

        <div className="w-full p-5 md:p-10 rounded-md bg-background-1000 flex flex-col justify-between h-auto flex-wrap shadow-md">
          <div className="bg -red-500 flex md:items-center justify-between md:flex-row flex-col items-start gap-2">
            <div>
              <p className="text-lg font-semibold text-primary-700">
                Status :{" "}
                <span className="capitalize text-text-950">{paymentDetails?.status || 'Active'  }</span>
              </p>
              <p className="text-sm font-light text-text-1000">
                Individual membership:Rs 199/mo
              </p>
            </div>

            <button
              className="p-3 rounded-md text-text-950 bg-primary-400 hover:bg-primary-500 transition-colors duration-300 text-white ease-in-out md:w-fit w-full"
              onClick={handleShowDetails}
            >
              Manage Subscription
            </button>
          </div>
          <div
            className={`bg-red -500 pt-2 gap-6 mt-3 ${
              isopen && paymentDetails ? "flex flex-col" : "hidden"
            }  border-t border-text-150  `}
          >
            <div>
              <p>Thank you for being a pro member</p>
            </div>
            <div className="flex w-full justify-between md:items-center flex-col md:flex-row ">
              <p className="text-sm font-light text-primary-700">
                Your next billing date :
                <span className="capitalize text-text-950">{convertEpochToDate(paymentDetails?.charge_at)}</span>
              </p>

              <button className="text-red-500 md:px-3   text-left pt-3 md:pt-0 justify-evenly" onClick={handleOpen}>
                Cancel Subscription
              </button>
            </div>
            <p className="text-primary-700 text-sm">Payment method : <span className="capitalize text-text-950">{paymentDetails?.payment_method}</span></p>
          </div>
        </div>
        <Modal open={open} setOpen={handleOpen}>
        <CancelSubscription open={open} handleOpen={handleOpen} />
        </Modal>
      
      
   </div>
  );
};

import React, { useState } from "react";
import { BuySubscription, ShowSubscription, Sidebar } from "../components";
import { useSelector } from "react-redux";
import {  useUserProfileQuery } from "../slices/usersApiSlice";
import { useEffect } from "react";
import { PaymentSkeleton } from "../loaders";

export const Payments = () => {
    const open = useSelector((state) => state.open.isOpen);
    const {data,isLoading,isError}=useUserProfileQuery()
    const [isActive, setisActive] = useState()

    useEffect(() => {
        setisActive((data?.user?.subscription?.status)=='active'?true : false)
    }, [data,isLoading])


  return (
    <div className="flex flex-col md:flex-row   w-[100%]  ">
      {!isLoading?(<div className="bg-r ed-100 w-full">
            {isActive ?<ShowSubscription/>:<BuySubscription/>}
      </div>):<PaymentSkeleton/>}
    </div>
  ); 
};

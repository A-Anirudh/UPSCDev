import React, { useEffect, useState } from "react";
import {
  useLazyBuySubscriptionQuery,
  useLazyGetRazorPaykeyQuery,
} from "../../slices/subscriptionSclice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { useIsSubQuery } from "../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const BuySubscription = () => {
  const [key, setkey] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [subscriptionId, setsubscriptionId] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { email, username, phoneNumber } = userInfo?.data;

  const [subId] = useLazyBuySubscriptionQuery();
  const [rpzid] = useLazyGetRazorPaykeyQuery();

  const [ispro, setispro] = useState(false);
  const isSubIni = useIsSubQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubIni) {
      setispro(isSubIni?.data?.data);
    }
  }, [isSubIni, ispro]);
  useEffect(() => {
    if (ispro) {
      navigate("/home");
    }
  }, [ispro]);

  const subscribeHandler = async () => {
    try {
      setisLoading(true);
      const data = await subId();
      const rpdata = await rpzid();
      setsubscriptionId(data?.data?.data);
      setkey(rpdata?.data?.key);
      setisLoading(false);
    } catch (error) {
      console.error("Error buying subscription", error);
    }
  };

  useEffect(() => {
    if (subscriptionId && key) {
      const openPopUp = () => {
        const options = {
          key,
          name: "UPSC Max Subscription",
          description: "Unlock all the premium content",
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${
            import.meta.env.VITE_PAYMENT_SERVER
          }/api/payment/verification`,
          currency: "INR",
          prefill: {
            name: username,
            email: email,
            contact: phoneNumber,
          },
          notes: {
            address: "UPSC Max",
          },
          theme: {
            color: "#1216ed",
          },
          payment_method: {
            method: "upi",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };

      openPopUp();
    }
  }, [subscriptionId, key, username, email]);

  return (
    // <section className=" w-full md:w-[75%] h-screen flex   text-text-25 mx-auto">
    <div className=" flex flex-col  w-full text-center ">
      <div className="p-3      w-full ">
        <p className="xl:text-[2.5rem] font-bold">Buy Subscription</p>
        <p className=" font-normal text-text-150">
          Our pricing plans are designed to be affordable and flexible{" "}
        </p>
      </div>
      <div className="sidebar card-container  flex flex-col 2xl:flex-row  justify-center gap-10  overflow-auto items-center">
        <div className="flex gap-2 flex-col justify-center    bg-primary-100 p-10 md:p-10 lg:pt-3 lg:p-6 w-max lg:w-max    relative  transition-all  hover:shadow-xl md:rounded-md">
          <p className="font-bold text-[1.5rem] ">Pro Plan</p>
          <p className="font-light text-sm xl:text-[1rem] ">
            Best suited for aspirants
          </p>

          <p className="text-[2rem] 2xl:text-[3rem]  font-semibold">
            Rs 199<span className="ml-2 text-sm font-thin">/ Per Month</span>
          </p>
          <div className="flex flex-col gap-2 xl:gap-6 items-start ">
            <div className="feautures flex items-center gap-3 justify-center">
              <DoneOutlineOutlinedIcon className="text-primary-500" />
              <p className="text-sm xl:text-[1.2rem]">
                Access to all current affairs
              </p>
            </div>
            <div className="feautures flex items-center gap-3 justify-center">
              <DoneOutlineOutlinedIcon className="text-primary-500" />
              <p className="text-sm xl:text-[1.2rem]">Search affairs</p>
            </div>
            <div className="feautures flex items-center gap-3 justify-center">
              <DoneOutlineOutlinedIcon className="text-primary-500" />
              <p className="text-sm xl:text-[1.2rem]">Search events</p>
            </div>
            <div className="feautures flex items-center gap-3 justify-center">
              <DoneOutlineOutlinedIcon className="text-primary-500" />
              <p className="text-sm xl:text-[1.2rem]">Summerize events</p>
            </div>
            <div className="feautures flex items-center gap-3 justify-center">
              <DoneOutlineOutlinedIcon className="text-primary-500" />
              <p className="text-sm xl:text-[1.2rem]">No Ads</p>
            </div>
            <div className="feautures flex items-center gap-3 justify-center">
              <DoneOutlineOutlinedIcon className="text-primary-500" />
              <p className="text-sm xl:text-[1.2rem]">Daily news update</p>
            </div>
            <div className="feautures flex items-center gap-3 justify-center">
              <DoneOutlineOutlinedIcon className="text-primary-500" />
              <p className="text-sm xl:text-[1.2rem]">Recite the article</p>
            </div>{" "}
            <button
              onClick={subscribeHandler}
              disabled={isLoading}
              className="bg-primary-500 text-white  px-5 py-4  hover:bg-primary-600 disabled:bg-primary-200 w-full disabled:cursor-not-allowed"
            >
              <p className="text-xl font-jakarta">
                {isLoading ? "Loading..." : "Buy Subscription"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
    // </section>
  );
};

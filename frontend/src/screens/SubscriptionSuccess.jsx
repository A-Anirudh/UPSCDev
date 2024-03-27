import React, { useEffect, useState } from "react";
import { useNavigate,  useSearchParams } from "react-router-dom";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import logo from "../assets/logo.png";

export const SubscriptionSuccess = () => {
  const reference = useSearchParams()[0].get("reference");
  const [timer, setTimer] = useState(10); 
    const navigate=useNavigate()
  useEffect(() => {
    const timerId = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        // Redirect to home after 10 seconds
        localStorage.setItem('selected', 'Home'); 
        navigate('/'); 
      }
    }, 1000);

    return () => clearInterval(timerId); // Cleanup the interval on component unmount

  }, [timer, navigate]);  

  const handleClick=()=>{
    localStorage.setItem('selected','Home')
    navigate('/')
  }
  return (
    <div className="text-text-25 w-full h-screen flex items-center justify-center">
      <div className="p-4 rounded-lg bg-background-1000 shadow-md w-fit ">
        <div className="w-full flex  bg-re d-500 items-center gap-2 pb-2 border-b border-background-100">
          <img src={logo} className="w-5 h-5" />
          <p className='text-text-950'>Upsc<span className='text-[#ff2035]'>Max</span></p>

        </div>
        <div className="px-10 py-6 flex flex-col items-center justify-center gap-4">
          <p className=" text-2xl">Payment Successfull</p>
          <CheckCircleOutlineIcon sx={{ color: "green", fontSize: "5rem" }} />
          <p className="text-sm font-light text-text-1000">
            Reference id : {reference}
          </p>

            <p className="text-center text-md font-jakarta font-light">
                Congratulations you are a premium member.<br/>You have access to our premium features !!
            </p>
          <button onClick={handleClick} className="bg-primary-400  text-white px-6 py-2 w-full rounded-md font-jakarta">Go to website</button>
          <p className="text-text-1000">{`Redirecting in ${timer} seconds...`}</p>

        </div>
      </div>
    </div>
  );
};

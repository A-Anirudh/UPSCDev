import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
export const Banner = () => {
  const link =
    "https://res.cloudinary.com/duuwrm4bh/image/upload/v1706976158/banner_gijmww.webp";
    const [show, setshow] = useState(localStorage.getItem('ad'))
    const navigate=useNavigate()
    const handleAd=()=>{
        localStorage.setItem('ad',false);
        localStorage.setItem('selected','Payments')
        setshow(false)
        navigate('/buy-subscription');
        
    }

    const isPremium=useSelector((state)=>state.api.queries['userProfile(undefined)']?.data?.user?.subscription?.status)


  return (
    <div className={`   my-1 mx-2     ${show==='true' && isPremium!='active' ?"relative":'hidden'}`}  >
      <img src={link} className="w-full md:h-[200px] rounded-md" onClick={handleAd}/>
        <button className="text-white absolute right-0 top-0 p-5" onClick={()=>{localStorage.setItem('ad',false);setshow(false)}}><CloseIcon/></button>
    </div>
  );
};

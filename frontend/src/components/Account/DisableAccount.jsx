import React, { useState, useEffect } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useLazyDisableAccountQuery, useUserLogoutMutation } from "../../slices/usersApiSlice";
import toast from "react-hot-toast";
import { toastSuccess } from "../../utils/myToast";
import { useNavigate } from "react-router-dom";

export const DisableAccount = ({handleOpen}) => {

    const [disable]=useLazyDisableAccountQuery()
    const [isloading, setisloading] = useState(false)
    const navigate = useNavigate();
    const [logout] = useUserLogoutMutation();

    const handleLogout = () => {
        localStorage.clear();
        logout();
        document.body.classList.remove("dark");
        navigate("/");
        window.location.reload();
      };

    const handleDisable=async()=>{
        setisloading(true)
        try {
        const {data,error}=await disable();
            if(data){
                toastSuccess('Succuesfully disabled')
                handleLogout()
            }
            else if(error){
            toast.error('Retry')
            }
        } catch (error) {
            toast.error('Retry')
        }

    }


  return (
    <div className="w-[350px] bg-background-1000 p-4 flex flex-col gap-3 items-start text-sm rounded-md shadow-md">
      <p className="text-lg font-semibold flex items-center gap-3">
        <WarningAmberIcon className="text-red-500" />
        Disable account
      </p>
      <p className="w-full text-md font-medium">
        Your account will be temporarily disabled{" "}
      </p>
      <p className="     text-xs text-background-600">
        Reactivate within 30 days to avoid permanent deletion. You can reactivate
        by logging in using your credentials.
      </p>
      <div className="flex flex-wrap items-center gap-5">
        <button onClick={()=>handleOpen(false)} className="flex items-center">Cancel</button>
          {isloading?<LoadingIcon/>:null}
        <button className="text-red-600 " onClick={handleDisable}>{isloading?"Loading":"Disable"}</button>
      </div>
    </div>
  );
};

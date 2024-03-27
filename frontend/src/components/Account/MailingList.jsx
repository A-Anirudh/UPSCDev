import React, { useEffect, useState } from "react";
import { useUpdatePreferenceMutation } from "../../slices/usersApiSlice";
import { toastSuccess } from "../../utils/myToast";
import { ToggleButton } from "../../utils";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';


export const MailingList = ({ current }) => {
  const [updatePref] = useUpdatePreferenceMutation();
  const [isloading, setisloading] = useState(false);
  
  const [toggleState, setToggleState] = useState(current);
  const handleToggle = (newState) => {
    setToggleState(newState);
  };

  // useEffect(() => {
  //   console.log("toglle state", toggleState);
  // }, [toggleState]);


  
  const handleUnsusbribe = async () => {
    setisloading(true);
    if (current) {
      const { data, error } = await updatePref({ newPreference: false });
      if (data) {
        toastSuccess("Unsubscribed");
        setisloading(false);
        // window.location.reload();
      } else if (error) {
        toast.error("Failed to unsubscribe");
      }
    } else {
      const { data, error } = await updatePref({ newPreference: true });
      if (data) {
        toastSuccess("Subscribed");
        setisloading(false);

        // window.location.reload();
      } else if (error) {
        toast.error("Failed to Subscribe");
      }
    }
  };

  return (
    <div className="flex items-center w-full justify-between " onChange={handleUnsusbribe}>
      <span><MailOutlineOutlinedIcon className="mr-2"/> Daily updates</span> <ToggleButton toggle={toggleState} onToggle={handleToggle}  />
    </div>
  );
};

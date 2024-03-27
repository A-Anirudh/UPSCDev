import React, { useEffect, useState } from "react";
import { DisableAccount, MailingList, ProfileAvatars, Sidebar } from "../components";
import { userDetails } from "../data";
import {
  useLazyUserProfileQuery,
  useUpdatePreferenceMutation,
  useUserLogoutMutation,
  useUserProfileQuery,
  useUserUpdateProfileMutation,
} from "../slices/usersApiSlice";
import toast from "react-hot-toast";
import { avatars } from "../data";
import SettingsIcon from "@mui/icons-material/Settings";
import { ProfileSkeleton } from "../loaders";
import { useNavigate } from "react-router-dom";
import { Payments } from "./Payments";
import { Popover } from "../utils";
import { Modal } from "../utils/Modal";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { toastSuccess } from "../utils/myToast";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [update] = useUserUpdateProfileMutation();
  // const { refetch } = useUserProfileQuery();
  const [avatarDetails, setavatarDetails] = useState(avatars());
  const [selected, setselected] = useState();
  const [isloading, setisloading] = useState(false);
  const [profile] = useLazyUserProfileQuery(
    {},
    { refetchOnMountOrArgChange: selected }
  );
  const [updatePref] = useUpdatePreferenceMutation();
  const [open, setopen] = useState(false);
  const navigate = useNavigate();
  const [logout] = useUserLogoutMutation();
  const [avOpen, setavOpen] = useState(false);
  const [settingOpen, setsettingOpen] = useState(false);
  const [openDisable, setopenDisable] = useState(false)
  useEffect(() => {
    // On component mount
    fetchData();

    // On component unmount
    return () => {
      // Clean up any subscriptions, timers, etc. here if needed
    };
  }, []);

  useEffect(() => {
    // After userData updates, refetch profile data
    if (userData) {
      profile().refetch();
    }
  }, [userData]);

  const fetchData = async () => {
    try {
      const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), 60000);
      });
      const data = await Promise.race([profile().unwrap(), timeout]);
      setUserData(data?.user);
    } catch (error) {
      toast.error("Error fetching profile");
      console.error("Error fetching user profile:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (e.target.id && e.target.src) {
      setUserData({
        ...userData,
        avatarUrl: e.target.src,
        avatarPublicId: e.target.id,
      });
      setselected(e.target.id);
    } else if (name !== "avatar") {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await updatePref({ newPreference: !userData?.mailingList });
      if (data) {
        toastSuccess(userData?.mailingList ? "Unsubscribed" : "Subscribed");
        setopen(false);
        setisloading(false);
        fetchData(); // Refetch profile data after update
      } else if (error) {
        toast.error(userData?.mailingList ? "Failed to unsubscribe" : "Failed to subscribe");
      }
    } catch (error) {
      toast.error("Error updating preference:", error);
    }
  };

  const handleUpdate = async () => {
    setisloading(true);
    try {
      const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), 20000);
      });
      await Promise.race([update(userData).unwrap(), timeout]);
      toastSuccess("Updated successfully");
      setisloading(false);
      fetchData(); // Refetch profile data after update
    } catch (error) {
      toast.error("Error updating user profile:", error);
      console.error("Error updating user profile:", error);

    }
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
    document.body.classList.remove("dark");
    navigate("/");
    window.location.reload();
  };

  if (!userData || !avatars()) return <ProfileSkeleton />;

  return (
    <section className="w-full h-full  p-4 md:p-10 overflow-auto sidebar flex flex-col justify-between transition-all text-text-25">
      
      <div className=" w-full md:w-3/4 lg:w-1/2 mx-auto  ">
        <div className="flex items-center justify-between w-full ">
          <p className=" font-semibold  text-3xl md:text-[3rem]">Profile</p>
          <div className="bg-red -500  flex items-center relative">
            <button
              className="  font-jakarta px-6 py-2 rounded-full hover:shadow-md bg-green-500 text-white disabled:bg-green-600"
              type="button"
              onClick={handleUpdate}
              disabled={isloading}
            >
              {isloading ? "Updating..." : "Update"}
            </button>
            <div className="self-start flex flex-row items-center  h-10 relative">
              <button
                className="self-center px-3"
                onClick={() => {
                  setsettingOpen(!settingOpen);
                }}
              >
                <SettingsIcon />
              </button>
              {open ? (
                <Popover>
                  <MailingList
                    current={userData?.mailingList}
                    profile={profile}
                  />
                  <button
                    onClick={handleLogout}
                    className={`   self-start text-red-500 `}
                  >
                    Logout
                  </button>
                </Popover>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-fit">
          {userData?.avatar?.url?<img
            src={userData?.avatar?.url}
            className=" w-32 mt-5"
            id="profilePic"
          />:<AccountCircleSharpIcon sx={{fontSize:'8rem'}} className="text-text-25"/>}
          <div>
            <button
              className="font-jakarta p-5"
              onClick={() => setavOpen(true)}
            >
              Change avatar
            </button>
            <Modal open={avOpen} setOpen={setavOpen}>
              <div className="md:w-[50vw] w-[350px]">
            <ProfileAvatars
              open={avOpen}
              avatarDetails={avatarDetails}
              handleChange={handleChange}
              selected={selected}
              setavOpen={setavOpen}
              handleUpdate={handleUpdate}
            />
            </div>
            </Modal>
          </div>
        </div>
        <div className="flex w-full justify-start xl:items-center gap-10 lg:flex-row flex-col ">
          <div className="w-full max-h-full overflow-auto  p-4 my-4 flex flex-col gap-4  lg:w-[50%]">
            {userDetails().map((item, index) => (
              <div className="flex flex-col   font-jakarta" key={index}>
                <label className="font-medium text-primary-700">
                  {item.name}
                </label>
                <input
                  className="text-text-950 p-3 rounded-md bg-background-100 disabled:cursor-not-allowed disabled:text-background-400"
                  onChange={(e) => handleChange(e)}
                  name={item.id}
                  disabled={item.disabled}
                  value={
                    item.type == "date"
                      ? userData[item.id].slice(0, 10)
                      : userData[item.id]
                  }
                  type={item.type}
                />
              </div>
            ))}
          </div>
        </div>
        <Payments />
      </div>

      <Modal open={settingOpen} setOpen={setsettingOpen}>
        <div className="w-[350px] bg-background-1000 p-6 flex flex-col gap-4 items-start text-sm rounded-lg">
        <MailingList current={userData?.mailingList} profile={profile} />
        <button className="flex items-center " onClick={()=>navigate('/help-support')}><span className="mr-2"><HelpOutlineOutlinedIcon/></span>Help & support</button>
        <button
          onClick={handleLogout}
          className={`  px-2 py-1 rounded-md pb-[0.3rem] bg-red-600 text-white hover:bg-red-800`}
        >

          Logout
        </button>
          
        
        </div>
      </Modal>

    </section>
  );
};

import React, { useEffect, useState } from "react";
import navbarData from "../../utils/navbarData";
import { Link, useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useUserProfileQuery } from "../../slices/usersApiSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import{CloseIcon, SearchIcon} from '../../utils/icons'
import { SearchComponent } from "../Search/SearchComponent";
import CreateRoomButton from "../room/CreateRoomButton";
import { MeetingDropdown } from "../room/MeetingDropdown";
import { SearchContainer } from "../Search/SearchContainer";

export const LoggedUserBar = () => {
  const navigate = useNavigate();
  const [selected, setselected] = useState(localStorage.getItem("selected"));
  const [isDark, setisDark] = useState(localStorage.getItem("dark-mode"));
  const { data, error } = useUserProfileQuery();
  const [open, setopen] = useState(false)



  const isActive = useSelector((state) => state.api.queries['userProfile(undefined)']?.data?.user?.subscription);

const loc=window.location.pathname 

  useEffect(() => {
    localStorage.setItem("selected", selected);
  }, [selected,window.location.href]);

  const handleClick = (name, link) => {
    setselected(name);
    navigate(link);
    localStorage.setItem("selected", name);
    setopen(false)
  };
// useEffect(() => {
//   console.log('mounted')
// return console.log('unmouted')
// }, [data])



  const toggleDarkMode = () => {
    if (localStorage.getItem("dark-mode") == "true") {
      document.body.classList.remove("dark");
      setisDark("false");
      localStorage.setItem("dark-mode", false);
    } else {
      document.body.classList.add("dark");
      setisDark("true");
      localStorage.setItem("dark-mode", true);
    }
  };

  const handleOpen=()=>{
setopen(!open)
  }


  return (
    <nav className="w-full  font-jakarta text-text-25 p-4  grid grid-cols-1 lg:grid-cols-2 items-center  bg-background-50 justify-between z-[9999999] lg:px-10 border-b border-background-100 sticky top-0 ">
      <div className="bg -blue-800">
        {/* For mobile */}
        <div className="flex items-center justify-between lg:hidden">
          
        {
          isActive?.status === 'active' ? 
          
          <Link to='/home'className="font-bold text-xl text-text-25 hover:text-text-25 cursor-pointer ">UpscPro</Link>
          :          
          <Link to='/home'className="font-bold text-xl text-text-25 hover:text-text-25 cursor-pointer ">UpscMax</Link>
        }
          <div className=" items-center justify-center gap-5 flex">
          <SearchContainer/>

            <button
              className={`   rounded-full p-2 bg-background-100 flex gap-6    items-center transition-all  `}
              onClick={() => toggleDarkMode()}
            >
              {isDark != "true" ? <DarkModeIcon /> : <LightModeIcon />}
            </button>

            <button
              onClick={handleOpen}
            >
              {open?<CloseIcon/>:<MenuIcon sx={{ fontSize: "2rem" }} />}
            </button>
          </div>
        </div>
        <ul className={` ${open?'flex':'hidden'} lg:flex items-center  w-full  gap-10 list-none  flex-col lg:flex-row  z-[9999999] `}>

          {/* Conditional rendering of navbar */}
          {
          isActive?.status === 'active' ? 
          
          <Link to='/home'className="font-bold text-xl text-text-25 hover:text-text-25 cursor-pointer  hidden md:block">UpscPro</Link>
          :          
          <Link to='/home'className="font-bold text-xl text-text-25 hover:text-text-25 cursor-pointer  hidden md:block">UpscMax</Link>
        }
          {navbarData?.map((item) => (
            <li 
              key={item.name}
              className={`font-semibold cursor-pointer hover:text-accent-500  ${
                loc == item?.link ? "text-accent-500" : ""
              }`}
              onClick={() => handleClick(item?.name, item?.link)}
            >
              <span className="line-clamp-1">{item.name}</span>
            </li>
          ))}
          <li className={`${isActive?.status!='active'?"block font-semibold cursor-pointer ":"hidden"} ${
                loc == '/buy-subscription' ? "text-accent-500" : ""
              }`} onClick={()=>{navigate('/buy-subscription');setopen(false)}}>Subscription</li>
          <li className="block lg:hidden font-semibold" onClick={()=>{navigate('/profile');setopen(false)}}>Profile</li>
          <MeetingDropdown />
        </ul>
        
      </div>
      <div>
        <div className=" items-center justify-end gap-1 lg:flex hidden w-full ">
        <span className=" hidden xl:block w-3/4"><SearchComponent/></span>
          <span className="hidden lg:block xl:hidden"><SearchContainer/></span>
          

          

          <button
            className={`   rounded-full p-2 bg-background-100 flex gap-6    items-center transition-all  `}
            onClick={() => toggleDarkMode()}
          >
            {isDark != "true" ? <DarkModeIcon /> : <LightModeIcon />}
          </button>

          <button className="size-10" onClick={()=>{navigate('/profile');setopen(false)}}>
            {data?.user?.avatar?.url?<img src={data?.user?.avatar?.url}  />:<AccountCircleSharpIcon className="text-text-25" sx={{fontSize:'2.5rem'}}/>}
          </button>
        </div>
      </div>
    </nav>
  );
};

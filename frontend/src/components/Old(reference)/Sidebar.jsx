import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { setopen } from "../../slices/openSlice";
import sideItems from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../../slices/usersApiSlice";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import BugReportIcon from "@mui/icons-material/BugReport";
import { setbugopen } from "../../slices/bugSlice";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Popover } from "../../utils/Popover";
import { AllQuiz } from "./AllQuiz";

export const Sidebar = () => {
  const [selected, setselected] = useState(localStorage.getItem("selected"));
  const [isDark, setisDark] = useState(localStorage.getItem("dark-mode"));

  const navigate = useNavigate();
  const [logout] = useUserLogoutMutation();
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const isOpen = useSelector((state) => state.bugOpen.isBugOpen);
  const open = useSelector((state) => state.open.isOpen);

  const   onClick = () => {
    //function to open the report bug display

    dispatch(setbugopen(!isOpen));
  };
  // Function to toggle popover state
  const togglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

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

  useEffect(() => {
    localStorage.setItem("selected", selected);
  }, [selected]);

  const handleOpen = () => {
    dispatch(setopen(!open));
  };
  const handleButtonClick = async (item) => {
    localStorage.setItem("selected", item.name);
    setselected(localStorage.getItem("selected"));
    navigate(`${item.link}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
    document.body.classList.remove("dark");
    navigate("/");
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  // Add onMouseOut event to reset isHovered state
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <aside
      className={`hidden relative sidebar z-[1000] text-text-950  border-background-100 ${
        open ? "  md:w-[15rem] " : "md:w-[5rem]  "
      } md:h-screen font-[poppins]   sticky top:0 md:left-0 h-fit  transition-all p-2 pt-2 border-r shadow-sm  bg-background-50 flex md:flex-col md:justify-between ease-in-out`}
    >
      <div className=" w-full">
        <div className=" flex  items-center justify-between  w-full">
          <div
            onClick={()=>{navigate('/home');localStorage.setItem('selected','Home')}}
            className={` ${
              open ? " md:flex md:opacity-100 " : "md:hidden md:opacity-0 "
            }    flex gap-1 items-center font-bold text-xl  no-underline	cursor-pointer`}
          >
            <img src={logo} alt="UpscMax logo" className="w-8" />
            <p className="text-text-950">
              Upsc<span className="text-[#ff1818]">Max</span>
            </p>
          </div>
          <div className={`flex gap-1 ${open ? "" : "md:w-full"}`}>
            <button
              className={`flex md:hidden p-2  text-text-950 rounded focus:outline-none`}
              onClick={() => toggleDarkMode()}
            >
              {isDark != "true" ? <DarkModeIcon /> : <LightModeIcon />}
            </button>
            <button
              className={`open-button shadow-sm p-2  bg-blu e-500 outline-background-100 rounded-sm hidden md:flex text-text-950 justify-center items-center w-full `}
              onClick={handleOpen}
              onMouseOver={handleHover}
              onMouseOut={handleMouseOut}
            >
              <MenuIcon sx={{ fontSize: "2rem" }} />
            </button>
            <button
              className={` p-2  rounded-sm block md:hidden ${
                open ? "" : "md:w-full"
              }`}
              onClick={handleOpen}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <div
          className={`
                    mt-2
                        bg-background-50
                        absolute md:relative
                        w-full 
                        left-0
                        p-3 md:p-0
                        z-[9999999999]

                        ${open ? "block " : "hidden"}

                    md:flex
                    md:flex-col
                    
                    ${open ? " md:w-full " : " md:w-16 md:p-0 "}`}
        >
          <ul className={`flex flex-col bg-background-50  gap-1 `}>
            {sideItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleButtonClick(item)}
                className={`  ${
                  open ? "w-full " : "w-14 self-center"
                } p-2 md:py-3 px-4 flex gap-6  rounded-md  items-center transition-all  ${
                  selected === item.name
                    ? "bg-primary-100 text-text-500 font-medium"
                    : "bg-background-50"
                }`}
              >
                <span className="">{item.icon}</span>
                <span className={`${open ? "block" : " hidden"} text-text-950`}>
                  {item.name}
                </span>
              </button>
            ))}
          </ul>


          <AllQuiz/>

          <button
            className={`  ${
              open ? "w-full " : "w-14 self-center"
            } p-2 md:py-3 px-4 flex gap-6  rounded-md  items-center transition-all  `}
            onClick={() => toggleDarkMode()}
          >
            {isDark != "true" ? <DarkModeIcon /> : <LightModeIcon />}
            {isDark != "true" ? (
              <p className={`${open ? "block" : " hidden"} text-text-950`}>
                Dark mode
              </p>
            ) : (
              <p className={`${open ? "block" : " hidden"} text-text-950`}>
                Light mode
              </p>
            )}
          </button>
          <div
            className={`${
              open ? "w-full " : "w-14 self-center"
            } p-2 md:py-3 px-4 md:hidden flex gap-6  rounded-md  items-center transition-all relative ${
              selected == 'Help'
                ? "bg-primary-100 text-text-500 font-medium"
                : "bg-background-50"
            }`}
            onClick={() => setPopoverOpen(true)}
            onMouseEnter={togglePopover} // Add onMouseEnter event
            onMouseLeave={togglePopover} // Add onMouseLeave event
          >
            <HelpOutlineIcon />
            <p className={`${open ? "block" : " hidden"} text-text-950 `}>
              Help
            </p>

            {/* Popover Content */}
            {isPopoverOpen && open && (
              <Popover>
                <button
                  className="p-3 flex items-center gap-5 w-full text-text-25"
                  onClick={onClick}
                >
                  <BugReportIcon /> Report bug
                </button>
                <button className="p-3 flex items-center gap-5 w-full text-text-25 hover:text-text-25" onClick={()=>{navigate('/customer-support')}}><SupportAgentIcon/> Customer support</button>
              </Popover>
            )}
          </div>
        </div>
        
      </div>
      <div
            className={`${
              
              open ? "w-full " : "w-14 self-center"
            } p-2 md:py-3 px-4 hidden md:flex gap-6  rounded-md  items-center transition-all relative ${
              selected == 'Help'
                ? "bg-primary-100 text-text-500 font-medium"
                : "bg-background-50"
            }`}
            onClick={() => setPopoverOpen(true)}
            onMouseEnter={togglePopover} // Add onMouseEnter event
            onMouseLeave={togglePopover} // Add onMouseLeave event
          >
            <HelpOutlineIcon />
            <p className={`${open ? "block" : " hidden"} text-text-950 `}>
              Help
            </p>

            {/* Popover Content */}
            {isPopoverOpen && open && (
              <Popover>
                <button
                  className="p-3 flex items-center gap-5 w-full text-text-25"
                  onClick={onClick}
                >
                  <BugReportIcon /> Report bug
                </button>
                <button className="p-3 flex items-center gap-5 w-full text-text-25 hover:text-text-25" onClick={()=>{navigate('/customer-support')}}><SupportAgentIcon/> Customer support</button>
              </Popover>
            )}
          </div>
    </aside>
  );
};

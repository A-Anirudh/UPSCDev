import React, { useEffect } from "react";
import { Navbar, UnloggedUserBar } from "../components";
import HeroImg from "../assets/heroImg.svg";
import { Login } from "./Login";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { Modal } from "../utils/Modal";

export const Homepage = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))?.data?.pid) {
      navigate("/home");
    }
  }, []);

  return (
    <div
      className={` w-[100%]  ${open ? " overflow-hidden" : " overflow-auto"} `}
    >
      {/* <UnloggedUserBar/> */}

      <div className="heroSection  flex flex-col justify-center items-center flex-wrap relative">
        <div className="flex flex-wrap  w-full items-center justify-center p-5 lg:gap-[5rem] ">
          <div className="flex flex-col text-6xl md:text-[5rem] p-2 gap-2 md:h-[12rem]  ">
            <p className="font-bold ">Welcome</p>
            <p className="font-bold ">Aspirants</p>
          </div>

          <div className="flex flex-col p-8 md:h-[12rem]  justify-between gap-2">
            <p className="font-medium text-2xl w-[16rem]">
              Stay upto date with current affairs{" "}
              <span className="font-bold text-accent-500">Easily</span>
            </p>

            <button
              className="w-[10rem] font-[poppins] capitalize text-[1.1rem] font-bold bg-accent-500 py-3 px-6 rounded hover:shadow-lg hover:shadow-accent-300 text-white"
              onClick={handleOpen}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className={` w-[100%]  bg-center  bg-no-repeat box-border`}>
          <img src={HeroImg} />
        </div>
      </div>

      <section className="text-center font-medium">
        <p className="font-bold text-[2rem] md:text-[3rem]">Plans & Pricing</p>
        <p className="font-light text-[0.9rem] leading-[2rem]  ">
          Make sure to use everything we gotta provide
        </p>

        <div className="card-container flex flex-col lg:flex-row p-5 justify-center gap-10">
          <div className="flex flex-col justify-between gap-5 bg-primary-50 p-5 pt-10  md:p-[5rem] rounded-lg  xl-max:w-[30%] relative hover:scale-[1.03] transition-all  hover:shadow-xl">
            <div className="flex gap-8 flex-col    ">
              <p className="font-bold text-[1.5rem]">Basic Plan</p>
              <p className="text-[1.2rem] font-light">Free</p>
              <div className="flex flex-col gap-6 items-start ">
                <div className="feautures flex items-center gap-3 justify-center">
                  <DoneOutlineOutlinedIcon className="text-primary-500" />
                  <p className="text-[0.9rem] md:text-[1.2rem]">
                    Access to all current affairs
                  </p>
                </div>
                <div className="feautures flex items-center gap-3 justify-center">
                  <DoneOutlineOutlinedIcon className="text-primary-500" />
                  <p className="text-[0.9rem] md:text-[1.2rem]">
                    Access to all current affairs details
                  </p>
                </div>
              </div>
            </div>
            <button
              className="py-3 rounded-md capitalize font-[poppins] font-medium text-sm bg-primary-200 text-black "
              onClick={handleOpen}
            >
              Get Started
            </button>
          </div>

          <div className="flex gap-8 flex-col justify-between  bg-primary-100 p-5 pt-10 md:p-[5rem] rounded-lg min-h-[500px] xl:w-[30%] relative hover:scale-[1.03] transition-all  hover:shadow-xl">
            <p className="font-bold text-[1.5rem]">Pro Plan</p>
            <p className="text-[1.2rem] font-medium">Rs 199/month</p>
            <div className="flex flex-col gap-6 items-start ">
              <div className="feautures flex items-center gap-3 justify-center">
                <DoneOutlineOutlinedIcon className="text-primary-500" />
                <p className="text-[0.9rem] md:text-[1.2rem]">
                  Access to all current affairs
                </p>
              </div>

              <div className="feautures flex items-center gap-3 justify-center">
                <DoneOutlineOutlinedIcon className="text-primary-500" />
                <p className="text-[0.9rem] md:text-[1.2rem]">Search affairs</p>
              </div>
              <div className="feautures flex items-center gap-3 justify-center">
                <DoneOutlineOutlinedIcon className="text-primary-500" />
                <p className="text-[0.9rem] md:text-[1.2rem]">Search events</p>
              </div>
              <div className="feautures flex items-center gap-3 justify-center">
                <DoneOutlineOutlinedIcon className="text-primary-500" />
                <p className="text-[0.9rem] md:text-[1.2rem]">
                  Summerize events
                </p>
              </div>
              <div className="feautures flex items-center gap-3 justify-center">
                <DoneOutlineOutlinedIcon className="text-primary-500" />
                <p className="text-[0.9rem] md:text-[1.2rem]">No Ads</p>
              </div>

              <div className="feautures flex items-center gap-3 justify-center">
                <DoneOutlineOutlinedIcon className="text-primary-500" />
                <p className="text-[0.9rem] md:text-[1.2rem]">
                  Daily news update
                </p>
              </div>
              <div className="feautures flex items-center gap-3 justify-center">
                <DoneOutlineOutlinedIcon className="text-primary-500" />
                <p className="text-[0.9rem] md:text-[1.2rem]">
                  Recite the article
                </p>
              </div>
            </div>
            <button
              className="py-3 rounded-md capitalize font-[poppins] font-medium text-sm bg-primary-500 text-white "
              onClick={handleOpen}
            >
              Get Started
            </button>
          </div>

          <div className="flex gap-2 flex-col"></div>
        </div>
        <Modal open={open} setOpen={handleOpen}>
         
            <Login handleOpen={handleOpen} />
          
        </Modal>
      </section>
    </div>
  );
};

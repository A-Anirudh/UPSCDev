import React, { useEffect, useState } from "react";
import { Navbar, UnloggedUserBar } from "../components";
import HeroImg from "../assets/heroImg.svg";
import { Login } from "./Login";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { ImageCarousel, Modal } from "../components/UIComponents";
import { imageExport } from "../data";
import { CloseIcon } from "../utils/icons";
import { SubscriptionCard } from "./cards/SubscriptionCard";

export const Homepage = () => {
  const [open, setOpen] = useState(false);
  const sampleImages = imageExport();

  const showOff = [
    {
      icon: <CloseIcon />,
      title: "Dummy Data 123",
      extra: "small dummy",
    },
    {
      icon: <CloseIcon />,
      title: "Dummy Data 123",
      extra: "small dummy",
    },
    {
      icon: <CloseIcon />,
      title: "Dummy Data 123",
      extra: "small dummy",
    },
    {
      icon: <CloseIcon />,
      title: "Dummy Data 123",
      extra: "small dummy",
    },
  ];
  console.log(sampleImages);
  const features = [
    {
      title: "Lorem Ipsum",
      feature: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: sampleImages[0],
    },
    {
      title: "Dolor Sit Amet",
      feature:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: sampleImages[1],
    },
    {
      title: "Consectetur Adipiscing",
      feature:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: sampleImages[2],
    },
    {
      title: "Sed Do Eiusmod",
      feature:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: sampleImages[0],
    },
  ];
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
    <section className="">
      {/* Top section */}
      <section className="hero p-1 md:p-9  mx-auto md:mb-28  ">
        <div className=" lg:grid lg:grid-cols-2 place-content-center w-full  2xl:w-3/4 mx-auto  ">
          <div className="text-placeholder flex-col flex w-full justify-center gap-5 md:p-10 p-5">
            <p className=" w-full font-bold text-5xl xl:text-7xl">
              Unlock the power of the Mind
            </p>
            <p className="font-medium text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
              sint nesciunt ut eaque, odit necessitatibus repudiandae{" "}
            </p>
            <div className="flex flex-col md:flex-row">
              <button
                className="px-10 py-2  rounded-full capitalize font-[poppins] font-medium text-lg bg-primary-500 text-white hover:bg-primary-600 duration hover:outline hover:outline-black hover:outline-1 hover:outline-offset-1"
                onClick={handleOpen}
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="  h-full">
            <ImageCarousel images={sampleImages} />
          </div>
        </div>
      </section>
      {/* Mid section */}

      <section className="w-full   flex flex-col">
        <div>
          <div className="p-5 mx-auto flex flex-col md:flex-row gap-4 items-center justify-center ">
            {showOff.map((item) => (
              <div className="p-4 bg-re d-900 w-fit flex flex-col items-center justify-center">
                <span className="flex text-2xl">{item.icon}</span>
                <p className="text-xl font-extrabold text-accent-800">
                  {item.title}
                </p>
                <p className="font-medium text-gray-700">{item.extra}</p>
              </div>
            ))}
          </div>
        </div>
        <span className="bg-gradient-to-r from-gray-100 via-slate-400 to-gray-100 text-white font-semibold rounded p-[0.5px]"></span>
      </section>

      {/* Features section */}
      <section className=" p-5 flex flex-col items-center justify-center">
        {features.map((item, idx) => (
          <div
            className={`  md:gap-2 flex ${
              idx % 2 ? "" : " lg:flex-row-reverse "
            } p-4 items-center  md:justify-around flex-col lg:flex-row  mx-auto xl:w-3/4`}
          >
            <div className="lg:w-1/2 md:space-y-1 ">
              <p className="font-bold text-3xl lg:text-6xl ">{item.title}</p>
              <p className="text-md md:text-xl ">{item.feature}</p>
              <img
                src={item.image}
                alt="image"
                className="lg:hidden rounded-xl hover:scale-[1.01] duration-200 w-full"
              />
            </div>
            <div>
              <img
                src={item.image}
                alt="image"
                className="hidden lg:block rounded-xl hover:scale-[1.01] duration-200 w-full"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Features section */}
      <section className="p-5 md:p-10">
        <p className="text-6xl font-bold text-center p-6 ">Pricing </p>
        <div className="flex lg:flex-row flex-col items-center justify-center gap-3">
          <SubscriptionCard
            featureConfig={[1,1,1]}
            isPro={false}
            title={"Basic Plan"}
            price={"Free"}
            description={"Enjoy all the features"}
            key={'1'}
            open={open}
            setOpen={setOpen}
            
          />
                    <SubscriptionCard
            featureConfig={[1,1,0,1,0,1]}
            isPro={true}
            title={"Pro Plan"}
            price={"1999"}
            description={"Enjoy all the features"}
            time={'/yr'}
            open={open}
            setOpen={setOpen}
          />
              <SubscriptionCard
            featureConfig={[1,1,0,1,0,1,1]}
            isPro={false}
            title={"Basic Plan"}
            price={"199"}
            description={"Enjoy all the features"}
            time={'/mo'}
            open={open}
            setOpen={setOpen}
          />
        </div>


      </section>

      <Modal open={open} setOpen={handleOpen}>
        <Login handleOpen={handleOpen} />
      </Modal>
    </section>
  );
};

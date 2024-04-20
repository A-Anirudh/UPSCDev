import React from "react";
import { Login } from "../../screens/Login";
import logo from "../../assets/logo.png";
import { Modal } from "../UIComponents";
import { Link } from "react-router-dom";

export const UnloggedUserBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <div className="sticky top-0 z-[9999] shadow">
      <nav className="flex md:mx-9 items-center justify-between p-3 top-0 sticky  bg-background-50">
      <Link to='/' className="flex gap-1 items-center font-bold text-2xl cursor-pointer">
          <img src={logo} alt="UpscMax logo" className="w-10" />
          <p className="text-black">
            Upsc<span className="text-[#ff2035]">Max</span>
          </p>
        </Link>
        <div className="flex items-center gap-5 font-[poppins] text-white">
          <button
            className="bg-accent-500 py-[0.8rem] font-[poppins] text-sm capitalize px-6 rounded-lg hover:shadow-lg  "
            onClick={handleOpen}
          >
            Login
          </button>
          <Link to='/register'
            className="hidden hover:drop-shadow-md px-6 md:block font-medium py-[0.7rem] text-sm capitalize font-[poppins] rounded-md bg-background-50 outline outline-2 outline-offset-0 outline-primary-400 text-text-900"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <Modal open={open} setOpen={handleOpen}>
        <Login handleOpen={handleOpen} />
      </Modal>
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";
import {
  useUserLoginMutation,
  useVerifyRecaptchaMutation,
} from "../slices/usersApiSlice";
import { setUserCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import CloseIcon from "@mui/icons-material/Close";
import ReCAPTCHA from "react-google-recaptcha";

export const Login = ({ open, handleOpen }) => {
  const [form, setForm] = useState({});
  const [login] = useUserLoginMutation(); // Use useUserLoginMutation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verified, setverified] = useState(true);
  const [error, seterror] = useState();
  const captchaRef = useRef();
  const [verifycaptcha] = useVerifyRecaptchaMutation();
  const [isLoading, setisLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  var res;

  const handleSubmit = async () => {
    try {
      setisLoading(true);
      res = await login(form);
      setisLoading(false);
      if (res.data.pid) {
        res && dispatch(setUserCredentials(res));
        localStorage.setItem("selected", "Home");
        localStorage.setItem("all", true);
        localStorage.setItem("ad", true);

        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        localStorage.setItem("dark-mode", theme);
        if (theme) {
          document.body.classList.add("dark");
        }

        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      setForm({ ...form, password: "" });
      seterror("*" + res.error.data.message);
    }
  };

  const key = import.meta.env.VITE_SITE_KEY;

  const onChange = async (value) => {
    if (value) {
      const data = await verifycaptcha(value);
      setverified(false);

      captchaRef.current.reset();
    }
  };

  return (
    //
    // <section
    //   className={`${
    //     open ? "  absolute" : " hidden"
    //   }  z-[9999999]  h-screen  bg-blur w-full left-0  top-0 font-jakarta`}
    //   style={{
    //     backdropFilter: "blur(15px)",

    //   }}
    // >
    // <div className="w-full h-full flex flex-col items-center justify-center z-[900]">
    <div className="w-[350px] bg-background-50 rounded-md drop-shadow-2xl text-left">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex justify-between items-center">
          <p className="text-red-700 font-bold">{error}</p>{" "}
          <button onClick={handleOpen}>
            <CloseIcon sx={{ color: "red" }} />
          </button>
        </div>

        <p className="font-bold  text-2xl">Sign In</p>
        <p className="mb-3 font-normal text-sm">
          Enter your email and password to Sign In.
        </p>
        <p className="-mb-2 text-sm">Your Email</p>
        <input
          label="Email"
          type="email"
          name="email"
          onChange={(e) => handleInput(e)}
          disabled={isLoading}
          placeholder="Enter your email"
          className="p-2 px-3 text-md font-normal bg-gray-100 rounded-md disabled:cursor-not-allowed"
        />

        <p className="-mb-2 text-sm">Your Password</p>
        <div className="flex flex-col justify-center gap-1">
          <div className=" relative ">
            <input
              label="Password"
              type={visible ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={(e) => handleInput(e)}
              disabled={isLoading}
              placeholder="Enter your password"
              className="p-2 px-3 text-md font-normal bg-gray-100 rounded-md w-full disabled:cursor-not-allowed"
            />
            {visible ? (
              <VisibilityIcon
                className="absolute right-3 top-[20%]   text-gray-500 "
                onClick={() => {
                  setVisible(!visible);
                }}
              />
            ) : (
              <VisibilityOffIcon
                className="absolute right-3 top-[20%]   text-gray-500  "
                onClick={() => {
                  setVisible(!visible);
                }}
              />
            )}
          </div>
          <Link to="/forgot-password" className="text-sm text-right" onClick={()=>handleOpen(false)}>
            Forgot password
          </Link>
        </div>
        {/* <ReCAPTCHA
            sitekey={key}
            onChange={(e) => onChange(e)}
            ref={captchaRef}
          /> */}
      </div>

      <div className="p-5">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className=" disabled:bg-gradient-to-r disabled:from-primary-300 disabled:to-accent-300 disabled:hover:shadow-none bg-gradient-to-r from-primary-500 to-accent-500  font-normal capitalize text-xl w-full py-3 text-white rounded-md hover:shadow-lg"
        >
          {isLoading ? "Signing in.." : "Sign In"}
        </button>
        <p variant="small" className="mt-4 flex justify-center">
          Don't have an account?
          <Link to="/register" className="text-accent-500 font-medium" onClick={()=>handleOpen(false)}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
    // </div>
    // </section>
  );
};
{
  /* <div className='flex items-center justify-center h-screen font-jakarta '>
    //   <div className='p-[2rem] md:p-8 flex w-[350px] flex-col gap-6 border-2 border-gray-900 rounded-lg '>
    //     <p className='text-3xl font-semibold '>Login</p>
    //     <div className='mb-1 flex flex-col gap-2'>
          
    //       <label>Your Email</label>
    //       <Input className=" !border-t-blue-gray-200 focus:!border-t-gray-900" */
}
//       type='email'
//       placeholder="name@mail.com"
//         labelProps={{
//           className: "before:content-none after:content-none",
//         }} />
//     </div>
//     <div className='mb-1 flex flex-col gap-2'>
//       <label>Your Password</label>
//       <Input className=" !border-t-blue-gray-200 focus:!border-t-gray-900" type='password' placeholder="********"/>

//     </div>
//     <div className='w-full '>
//     <Button className='bg-secondary-500 font-jakarta w-full '>Login</Button>
//     <p className='text-center mt-2 font-medium'>New User?<a  className='text-secondary-500'href='/register'>Signup</a></p>
//     </div>
//   </div>
// </div>

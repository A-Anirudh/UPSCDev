import React, { useState } from "react";
import { useForgotPasswordMutation } from "../slices/usersApiSlice";
import {toast} from 'react-hot-toast'
export const ForgotPassword = () => {
  const [forgot] = useForgotPasswordMutation();
  const [form, setform] = useState({ email: "" });
  const [message, setmessage] = useState();
  const [loading, setloading] = useState(false);
  const handleSubmit = async () => {
    setloading(true);
    const { data, error } = await forgot(form);
    if (data) {
      setmessage(data?.message);
      toast.success("Reset mail sent");
      setloading(false);
    }
    else{
      toast.error(error?.data?.message)
    }
  };

  const handleChange = (e) => {
    const data = e.target.value;
    setform({ email: data });
  };

  if(message){
    return(
      <div className="h-screen w-full bg-primary-400 flex items-center justify-center flex-col">
        <p className="text-[2rem] font-bold text-center text-white  ">You can close this tab now</p>
        <a className="text-[1rem] font text-center text-white  px-6 py-3 bg-primary-700 rounded-md hover:text-white hover:bg-primary-800" href="https://mail.google.com/mail/u/0/#inbox">Check your mail inbox</a>

      </div>
    )
  }

  return (
    <div className="main-container  h-screen w-full flex items-center justify-center ">
      <div className="border px-6 py-4 rounded-md flex flex-col justify-between w-[350px] m-auto gap-9">
        <p className="text-2xl font-semibold">Forgot Password</p>
        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="m-2">Enter registered email</p>
            <input
              placeholder="Your email"
              value={form?.email}
              onChange={(e) => handleChange(e)}
              type="email"
              className="px-4 py-2 w-full bg-gray-100 rounded-md outline-none"
            />
          </div>
          <button
            className={`px-5 py-3 bg-green-500 w-full  rounded-md font-medium text-white hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {message ? message : "Send reset link"}
          </button>
        </div>
      </div>
    </div>
  );
};

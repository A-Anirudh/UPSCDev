import React from "react";
import EmailIcon from '@mui/icons-material/Email';
export const EmailSent = () => {
  return (
    <div className="w-full  h-screen flex flex-col items-center justify-center bg-re d-500">
      <p className="font-[poppins] text-center  py-6 px-6 font-semibold md:text-xl text-primary-400">
        Verification email sent
      </p>
      <a
        href="https://mail.google.com/mail/u/0/#inbox" target="_blank"
        className="px-6 py-3 bg-green-500 font-medium rounded-md font-[poppins] w-fit hover:shadow-md text-white"
      >
        <EmailIcon className="mr-2"/>Take me to Gmail inbox
      </a>
    </div>
  );
};

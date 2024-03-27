//this component is used to ask whether they want to report a bug
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { setbugopen } from "../../slices/bugSlice";
import ReportIcon from "@mui/icons-material/Report";
import { useEffect } from "react";
import {
  useAddBugMutation,
  useUploadImageMutation,
} from "../../slices/reportBugSlice";
import toast from "react-hot-toast";
import { toastSuccess } from "../../utils/myToast";
export const ReportBug = ({setOpen}) => {
  const open = useSelector((state) => state.bugOpen.isBugOpen);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ complaint: "", image_link: "" });
  const [imageName, setimageName] = useState("Name");
  const [uploading, setuploading] = useState(false);
  const [uploadImage] = useUploadImageMutation();
  const [info, setinfo] = useState("Upload");
  const [uploadedImage, setuploadedImage] = useState(null);
  const [addBug] = useAddBugMutation();
  const [isSubmit, setisSubmit] = useState(false);
  const [message, setmessage] = useState();
  const [isError, setisError] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUploadImage = async () => {
    setuploading(true);
    setinfo("Uploading");
    const formBody = new FormData();
    formBody.append("file", imageName);
    formBody.append("upload_preset", "article_preset");
    formBody.append("cloud_name", "duuwrm4bh");
    const { data } = await uploadImage(formBody);
    if (data) {
      setinfo("Uploaded");
      setForm({ ...form, image_link: data.secure_url });
      setuploadedImage(data.secure_url);
    } else {
      setinfo("Error uploading");
    }
  };

  const handleSubmit = async () => {
    setisSubmit(true);
    const { data, error } = await addBug(form);
    setisSubmit(false);
    if (data) {
      setmessage(data?.message);
    } else if (error) {
      setisError(true);
      setmessage(error?.data?.message);
      toast.error("Failed to submit, try again");
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      dispatch(setbugopen(false));
      setForm({ complaint: "", image_link: "" });
    };
  }, []);

  return (
    // <div
    //   className={`${
    //     open ? "  absolute  " : " hidden"
    //   }    h-screen md:w-full bg-blur w-full left-0  top-0 box-border bg-red-500 flex flex-col items-start justify-start pt-4 text-text-25 z-[9999] font-jakarta `}
    //   style={{
    //     backdropFilter: "blur(15px)",
    //     backgroundColor: "rgba(0,0,0,0.5)",
    //   }}
    // >
    <div className=" mx-auto w-[80vw] md:w-[75vw]   h-[85vh] bg-background-1000 p-3 md:p-5  mt-20  rounded-md  flex flex-col gap-7 overflow-auto ">
      <div className="flex flex-wrap items-center justify-between  ">
        <p className="text-xl font-semibold flex items-center gap-4">
          <span>
            <ReportIcon />
          </span>
          Report bug
        </p>
      </div>
      <section className=" flex flex-col items-start  max- h-[490px] xl:h-[750px]">
        <div className="w-full  bg-pi nk-500 p-1">
          <p className="text-lg text-background-600 p-1">Bug Description</p>
          <textarea
            className="p-3 bg-background-50 outline-none border border-background-100 rounded-md font-jakarta w-full h-[200px] lg:h-[300px] resize-none"
            onChange={(e) => handleChange(e)}
            value={form.complaint}
            name="complaint"
          />
        </div>

        <div className="w-full   flex flex-col items-start justify-between h-full p- 3">
          <div className="w-full">
            <p className="text-lg text-background-600 p-1">
              Upload screenshots
            </p>
            <div className=" w-full flex items-center justify-between flex-wrap">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setimageName(e.target.files[0])}
                className="mt-2 p-2 bg-background-50 border border-background-100 rounded-md focus:outline-none focus:border-primary-500"
              />
              <button
                className="px-4 py-2 bg-background-100 rounded md:w-fit w-full mt-1 md:mt-0 "
                onClick={handleUploadImage}
              >
                {info}
              </button>
            </div>
          </div>

          <div
            className={`${
              uploadedImage ? "block" : "hidden"
            } bg-cover aspect-video w-[25%] p-2 `}
          >
            <p className="text-lg text-background-600 p-1">
              Uploaded screenshots
            </p>
            <img src={uploadedImage} className="rounded" />
          </div>
          <div className="w-full flex flex-wrap items-center justify-between">
            <p
              className={`text-md ${
                isError ? "text-red-500" : "text-green-500"
              } text-center font-semibold  `}
            >
              {message}
            </p>
            <div className="grid grid-cols-2 gap-2  ">
              <button className="px-10 md:my-3 py-2  rounded w-full md:w-fit self-end bg-transparent border border-background-200 text-white " onClick={()=>setOpen(false)}>Cancel</button>
              <button
                disabled={isSubmit}
                className="px-10 md:my-3 py-2 bg-primary-500 rounded w-full md:w-fit self-end disabled:bg-primary-400 text-white disabled:cursor-not-allowed"
                onClick={handleSubmit}
              >
                {isSubmit ? "Submiting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    // </div>
  );
};

import React, { useState } from "react";

export const ProfileAvatars = ({ open, avatarDetails, handleChange,selected,setavOpen,handleUpdate,profile }) => {
//   const [open, setopen] = useState(isOpen);
//   const [selected, setselected] = useState();

const handleClick=async()=>{
    setavOpen(false);
    await handleUpdate();
}

  return (
    // <section
    //   className={`${
    //     open ? "  absolute" : " hidden"
    //   }  z-[9999999]  h-screen  bg-blur w-full left-0  top-0 font-jakarta text-center`}
    //   style={{
    //     backdropFilter: "blur(15px)",
    //   }}
    // >
        // <div className="w-full h-screen font-jakarta flex items-center justify-center rounded-md ">
        <div className=" rounded-sm bg-background-1000 h-[90%] ">
              <p className=" font-semibold  text-lg text-left p-4 border-b border-background-200">
                Select your avatar
              </p>
              <div className="flex flex-wrap  gap-4 p-10 items-center justify-center lg:justify-start">
                {avatarDetails?.map((item) => (
                  <div key={item?.asset_id}>
                    <img
                      className={`${
                        selected === String(item?.public_id)
                          ? "outline outline-3 outline-text-900"
                          : ""
                      } w-12 xl:w-14 rounded-[50%]`}
                      src={item?.secure_url}
                      alt={"avatar"}
                      onClick={() =>
                        handleChange({
                          target: {
                            id: item?.public_id,
                            src: item?.secure_url,
                          },
                        })
                      }
                      id={item?.public_id}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-5 flex-wrap p-4">
                <button className="border border-gray-800 px-4 py-2 rounded-full" onClick={()=>{setavOpen(false)}}>Cancel</button>
                <button className=" bg-primary-500 px-4 py-2 rounded-full" onClick={handleClick}>Update</button>

              </div>
            </div>
            // </div>

    // </section>
  );
};

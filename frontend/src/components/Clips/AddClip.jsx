import React from "react";

import { useAddClipMutation } from "../../slices/clipSlice";
import { toastSuccess } from "../../utils/myToast";
import toast from "react-hot-toast";
import { CloseIcon } from "../../utils/icons";
import { useEffect } from "react";
import { useState } from "react";

export const AddClip = ({ selectedText, setSelectedText, open, setOpen,id,position }) => {
  const [addClip] = useAddClipMutation();
  const [statuscontrol, setstatuscontrol] = useState({isLoading:false,error:null})
  const [clipName, setclipName] = useState('')

  const handleAddSelectedText = async () => {
    // console.log("Selected Text:", selectedText);
    setSelectedText("");
    window.getSelection().removeAllRanges();
    try {
      setstatuscontrol({...statuscontrol,isLoading:true})
      const { data, error } = await addClip({
        affairId: id,
        clip: selectedText,
        clipName:clipName,
        clipPosition:position
      });

      setstatuscontrol({...statuscontrol,isLoading:false})
      setclipName('')
      setOpen(false)
      if (data) {
        toastSuccess("Clip added");
        
      } else if (error) {
        toast.error("Failed to add");
        console.log(error)
      }
    } catch (error) {
      toast.error("Failed to add");
      console.log(error)
    }
  };

  useEffect(() => {
    if(!open){
      setSelectedText(null); window.getSelection().removeAllRanges();
      setclipName('')
    }

  
  }, [open])
  
  return (
    <div className="bg-background-1000 p-5 rounded-md w-[350px]">
      <div>
        <div className="w-full flex items-center justify-between mb-3">
          <p className="text-xl font-medium ">Create Clip</p>
         <button onClick={()=>setOpen(false)}><CloseIcon className={"text-background-500"} /></button> 
        </div>

        <div>
          <p className="text-sm text-background-500">Clip name</p>
          <input
            type="text"
            value={clipName}
            className="px-3 py-2 rounded-lg bg-background-100 w-full my-2  outline-none focus:outline-accent-700 focus:outline text-sm "
            onChange={(e)=>{setclipName(e.target.value)}}
          />
        </div>
        <div>
          <p className="text-sm text-background-500 mb-1">Clipped text</p>
          <p className="line-clamp-3 text-sm">{selectedText}</p>
        </div>
        <div className="pt-3 flex items-center justify-end">
          <button className=" rounded-full py-2 px-4 hover:bg-background-100 text-md font-light" onClick={()=>{setOpen(false);setSelectedText(null); window.getSelection().removeAllRanges();}}>Cancel</button>
          <button className={` rounded-full py-2 px-4 hover:bg-background-100 text-md text-blue-500 font-semibold disabled:cursor-not-allowed disabled:text-background-600 `} type="submit" onClick={handleAddSelectedText}>{statuscontrol.isLoading?"Loading":'Create'}</button>
        </div>
      </div>
    </div>
  );
};

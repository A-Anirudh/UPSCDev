import React, { useState } from "react";
import { ArrowUpward, DeleteIcon } from "../../utils/icons";
import { Modal } from "../UIComponents";
import { useDeleteClipMutation } from "../../slices/clipSlice";
import { toastSuccess } from "../../utils/myToast";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const ClipCard = ({
  _id,
  clip,
  refetch,
  clipName,
  setclip,
  setopen,
  affairId,
  clipPosition,
}) => {
  const handleClick = () => {
    setopen(true);
    setclip(clip);
  };
  const [deleteClip] = useDeleteClipMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const { data, error } = await deleteClip({ clipId: _id });
      if (data) {
        await refetch();
        toastSuccess("Deleted");
      } else if (error) {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="min-w-full   hover:scale-[1.01] bg-background-1000 py-2 px-3 rounded-md cursor-pointer border border-background-100">
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-lg  font-semibold" onClick={handleClick}>
              {clipName}
            </p>

            <button
              className="p-1 flex bg-background-100 rounded hover:bg-background-200 "
              onClick={() => {
                navigate(`/affair/${affairId}`);
                localStorage.setItem("clip", clipPosition);
              }}
            >
              <ArrowUpward />
            </button>
          </div>
          <button
            className="p-2 rounded-full hover:bg-background-100 flex"
            onClick={handleDelete}
          >
            <DeleteIcon className={"text-red-500   "} />
          </button>
        </div>
        <p className="line-clamp-3 text-background-800" onClick={handleClick}>
          {clip}
        </p>
      </div>
    </div>
  );
};

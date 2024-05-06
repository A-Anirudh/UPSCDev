import React from "react";
import { Link } from "react-router-dom";
import { useDeleteRoomsMutation } from "../../slices/roomSlice";
import { toastSuccess } from "../../utils/myToast";
import toast from "react-hot-toast";

export const RoomDetailsCard = ({ roomId, roomName, isActive, refetch, t }) => {
  const [deleteRoom] = useDeleteRoomsMutation();
  const handleDelete = async () => {
    try {
      const { data, error } = await deleteRoom({roomId:roomId});
      await refetch()
      if(data){
        toastSuccess('Deleted succesfully')
      }
      else{
        toast.error('Failed to delete')
        console.log(error)
      }
    } catch (error) {
        toast.error('Failed to delete')
        console.log(error)
    }
  };

  return (
    <div className="p-3 flex flex-col w-full bg-background-1000 border rounded-md border-background-100 space-y-2 hover:bg-background-100 duration-200 ">
      <div className="flex w-full     items-center justify-between">
        <p className="flex items-center gap-2">
          {t('meetings.meetingNameText')} : <span className="font-semibold">{roomId}</span>{" "}
        </p>

        <Link to="/room-details">{t('meetings.meetingDetails')}</Link>
      </div>
      <p>
      {t('meetings.roomName')} : <span className="font-semibold">{roomName}</span>
      </p>
      {isActive ? (
        <button  onClick={handleDelete} className="self-end text-red-500 border border-red-500 hover:bg-red-500 px-2 rounded-md text-sm py-1 pb-[0.3rem] duration-200  hover:text-white">
          End meet
        </button>
      ) : null}
    </div>
  );
};

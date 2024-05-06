import React, { useRef, useState } from "react";
import { LibraryCard } from "./LibraryCard";
import { DeleteIcon, EditIcon, LeftIcon, RightIcon } from "../../utils/icons";
import { useEffect } from "react";
import {
  useDeleteCollectionMutation,
  useUpdateCollectionNameMutation,
} from "../../slices/CollectionSlice";
import { toastSuccess } from "../../utils/myToast";

export const CollectionCardContainer = ({
  category,
  cards,
  refetch,
  playlistId,
  language
}) => {
  const [newCollectionName, setnewCollectionName] = useState(category);
  const [isEdit, setisEdit] = useState(false);
  const [copy, setcopy] = useState(newCollectionName);
  const [update] = useUpdateCollectionNameMutation();
  const [deleteCollection] = useDeleteCollectionMutation();
  const sliderRef = useRef(null);
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 200; // You can adjust the scroll amount as needed
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200; // You can adjust the scroll amount as needed
    }
  };
  // useEffect(() => {
  //   console.log("edit", isEdit);
  // }, [isEdit]);

  const handleSubmit = async () => {
    try {
      const { data, error } = await update({
        newName: newCollectionName,
        playlistId: playlistId,
      });
      if (data) {
        setisEdit(false);
        toastSuccess("Updated");
      }
    } catch (error) {
      toast.error("Error in updating");
    }
  };

  const handleDelete = async () => {
    try {
      const { data, error } = await deleteCollection({
        playlistId: playlistId,
      });
      if (data) {
        await refetch();
        setisEdit(false);
        toastSuccess("Deleted");
      }
    } catch (error) {
      toast.error("Error in deleting");
    }
  };

  return (
    <div className=" ">
      <div className="flex gap-3  items-center justify-between md:justify-normal ">
        <div className="flex flex-col">
          <input
            type="text"
            className={`font text-xl capitalize  ${
              isEdit
                ? " bg-background-1000   border border-background-100 px-3 py-2 rounded-md outline-none"
                : "bg-transparent my-1"
            }`}
            value={newCollectionName}
            disabled={!isEdit}
            onChange={(e) => setnewCollectionName(e.target.value)}
          />
          <div
            className={`flex gap-2 py-2 text-sm self-end ${
              isEdit ? "" : "hidden"
            }`}
          >
            <button
              className="bg-secondary-500 text-white px-2 py-1 rounded-md"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              onClick={() => {
                setisEdit(false);
                setnewCollectionName(copy);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="flex gap-1 ">
          <button
            className="flex text-background-500 hover:text-background-700"
            onClick={(e) => {
              setisEdit(true);
            }}
          >
            <EditIcon className={"text-[1.5rem]"} />
          </button>
          <button
            className="flex  text-red-500 hover:text-red-700"
            onClick={handleDelete}
          >
            <DeleteIcon className={"text-[1.5rem]"} />
          </button>
        </div>
      </div>
      <div className=" flex flex-col   relative ">
        <div
          className="flex gap-2  overflow-x-auto snap-x w-full scroll-smooth sidebar relative"
          ref={sliderRef}
        >
          {/* <div className="h-auto"> */}
          {!cards || cards?.length == 0 ? (
            <p className="py-3 font-extralight text-lg text-background-500 ">
              Collection empty
            </p>
          ) : null}
          {cards?.map((item, idx) => (
            <LibraryCard
              item={item}
              key={idx}
              refetch={refetch}
              playlistId={playlistId}
              language={language}
            />
          ))}
        </div>
        
          <button
            className="p-2 rounded-full bg-background-100 flex  absolute -left-3  md:-left-5 bottom-[40%]    shadow-md "
            onClick={scrollLeft}
          >
            <LeftIcon />
          </button>
      
          <button
            className="p-2 rounded-full bg-background-100 flex absolute -right-3 md:-right-5  bottom-[40%] backdrop-blur-md backdrop-opacity-55 "
            onClick={scrollRight}
          >
            <RightIcon />
          </button>

      </div>
    </div>
  );
};

import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddData } from "../../slices/tempData";
import { toastSuccess } from "../../utils/myToast";
import {
  useAddAffairToCollectionMutation,
  useCreateCollectionMutation,
  useGetAllCollectionsQuery,
} from "../../slices/CollectionSlice";
import toast from "react-hot-toast";

export const AddCollection = ({
  id,
  setOpen,
  collectionData,
  refetch,
  error,
}) => {
  const dataSelector = (state) => {
    const data = state?.api?.queries[`getOneAffair("${id}")`]?.data?.data[0];

    return {
      thumbnail: data?.thumbnail,
      affairName: data?.affairName,
    };
  };



  // Memoize the selector
  const memoizedDataSelector = useMemo(() => dataSelector, [id]);

  // Use the memoized selector
  const { thumbnail, affairName } = useSelector(memoizedDataSelector);

  const [selectedCollection, setSelectedCollection] = useState(null);
  const [createNew, setcreateNew] = useState(false);
  const [newName, setnewName] = useState("");
  const [selectedId, setselectedId] = useState();

  const [createCollection] = useCreateCollectionMutation();
  const [addToCollection] = useAddAffairToCollectionMutation();

  const [existing, setexisting] = useState(false);

  useEffect(() => {
    setexisting(checkInCollection());
  }, [collectionData]);

  const handleChange = (e) => {
    setcreateNew(false);
    setSelectedCollection(e.target.value);
    setselectedId(e.target.id);
  };
  // useEffect(() => {
  //   console.log("selected ", selectedCollection);
  // }, [selectedCollection]);

  const handleInput = (e) => {
    const value = e.target.value;
    setnewName(value);
  };
  const handleCreate = async () => {
    if (newName.trim() !== "") {
      try {
        const { data, error, isLoading } = await createCollection({
          playlistName: newName,
        });
        if (data) {
          await refetch();
          setnewName("");
          toastSuccess("New collection added");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log("Error", error);
      }
    }
    setcreateNew(false);
    setnewName("");
  };

  // useEffect(() => {
  //   console.log("exis",existing)
  // }, [existing])

  const checkInCollection = (playlistName, articles) => {
    if (playlistName && articles) {
      for (let i = 0; i < articles?.length; i++) {
        if (articles[i].articleId == id) {
          return true;
        }
      }
    }
  };
  const handleAdd = async () => {
    try {
          if (selectedCollection.trim() !== "") {
      const body = {
        playlistId: selectedId,
        article: {
          articleId: id,
          articleName: affairName,
          thumbnail: thumbnail,
        },
      };
      try {
        const { data, error, isLoading } = await addToCollection(body);
        if (data) {
          await refetch();
          setnewName("");
          toastSuccess("Added to collection");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log("Error", error);
      }
      setOpen(false);
    }
    } catch (error) {
      toast.error('Enter colection name')
    }
    setcreateNew(false);
    setnewName("");
  };

  return (
    <div className="bg-background-1000 p-5 w-[250px]  rounded-lg z-[5000] flex flex-col items-start gap-2">
      <p className="font-semibold text-xl">Add to</p>
      <p
        className={`py-2 text-sm text-gray-500 ${
          collectionData?.length == 0 ? "block" : "hidden"
        }`}
      >
        {collectionData?.length == 0 ? "No collections yet" : ""}
      </p>
      <div className="flex flex-col gap-1">
        {collectionData?.map((item, idx) => (
          <div key={idx} className="space-x-3 flex items-center gap-1 ">
            <input
              className={`  h-5 aspect-square ${
                checkInCollection(item?.playlistName, item?.articles)
                  ? " cursor-not-allowed"
                  : ""
              } accent-accent-500`}
              type="checkbox"
              name="collection"
              id={item?._id}
              value={item?.playlistName}
              checked={selectedCollection === item?.playlistName}
              disabled={checkInCollection(item?.playlistName, item?.articles)}
              onChange={(e) => handleChange(e)}
              style={{ backgroundColor: "transparent" }}
            />
            <label htmlFor={idx} className="">
              {item?.playlistName}
            </label>
          </div>
        ))}
      </div>
      <button
        className={`${
          !collectionData ? "hidden" : "block"
        } bg-accent-400 text-white rounded-md py-1 px-2`}
        onClick={handleAdd}
      >
        Add
      </button>
      <button
        className={`${
          createNew ? "hidden" : "block"
        } text-md text-center w-full font-light`}
        onClick={() => {
          setcreateNew(true);
          setSelectedCollection(null);
        }}
      >
        + Create new collection
      </button>
      <div className={`${!createNew ? "hidden" : "block"} w-full`}>
        <div className="w-full">
          <p className="text-sm text-background-700 py-1">Collection name</p>
          <input
            type="text"
            name=""
            id=""
            className=" bg-background-100 text-sm rounded  px-3 py-1 w-full outline-none border-none"
            onChange={(e) => handleInput(e)}
            value={newName}
          />
        </div>
        <button
          className="text-blue-500 mt-2  text-right w-full rounded-full font-medium self-end"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
};

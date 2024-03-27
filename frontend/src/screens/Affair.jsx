import React, { useEffect, useMemo, useState } from "react";
import {AllAffairsContainerNew} from "../components";
import { useAddFavMutation, useDeleteFavMutation, useGetAllFavQuery } from "../slices/favouriteSlice";
import { toastSuccess } from "../utils/myToast";
import toast from "react-hot-toast";

export const Affair = () => {
  const [myFavs, setmyFavs] = useState();
  const favData = useGetAllFavQuery({}, { refetchOnMountOrArgChange: true });
  const [addFav] = useAddFavMutation();
  const [delFav] = useDeleteFavMutation();


  useEffect(() => {
    if (favData?.data?.data) {
      setmyFavs(favData.data.data);
    }
  }, [favData, myFavs]);

  const myFavsLookup = useMemo(() => {
    try {
      return myFavs.reduce((lookup, fav) => {
        lookup[fav.affairId] = true;
        return lookup;
      }, {});
    } catch (error) {}
  }, [myFavs, favData]);
  const isFavourite = (affairId) => {
    try {
      return !!myFavsLookup[affairId];
    } catch (error) {}
  };

  
  const handleFav = async (_id, isFavourite, affairName, setisFav) => {
    if (!isFavourite) {
      try {
        const { data, error } = await addFav({ affairId: _id });

        if (data?.pid) {
          toastSuccess("Added to favourites");
          setisFav(true);
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        await favData.refetch();
      }
    } else if (isFavourite) {
      const { pid } = myFavs.find((fav) => fav.affairId === _id);
      if (pid) {
        try {
          const { data, error, isLoading } = await delFav({ pid: pid });
          if (data) {
            toastSuccess("Removed to favourites");
            setisFav(false);
          }
        } catch (error) {
          toast.error("Failed to add");
        } finally {
          await favData.refetch();
        }
      }
    }
  };


  return (
    <div
      className={` `}
    >

      <AllAffairsContainerNew handleFav={handleFav} isFavourite={isFavourite} myFavs={myFavs}/>
    </div>
  );
};
    
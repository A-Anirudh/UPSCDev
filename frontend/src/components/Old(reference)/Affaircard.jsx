import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useAddFavMutation,
  useDeleteFavMutation,
  useGetAllFavQuery,
} from "../../slices/favouriteSlice";
import { useSelector } from "react-redux";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toastLoading, toastSuccess } from "../../utils/myToast";

export const Affaircard = ({
  _id,
  pid,
  affairName,
  tags,
  setFavListChanged,
  thumbnail,
}) => {
  const navigate = useNavigate();
  const [isFav, setisFav] = useState(false);
  const [addFav] = useAddFavMutation();
  const [allFav, setallFav] = useState();
  const [favChange, setfavChange] = useState(123);
  const [delFav] = useDeleteFavMutation();

  const { data, error } = useSelector(
    (state) => state.api.queries["getAllFav({})"]
  );

  useEffect(() => {
    if (data) setallFav(data.data);
  }, [data]);

  const { refetch } = useGetAllFavQuery(
    {},
    { refetchOnMountOrArgChange: true || favChange }
  );

  const handleClick = () => {
    navigate(`/all-affairs/${pid}/${_id}`);
    localStorage.setItem("all", false);
    localStorage.setItem("selected", "Affairs");
    localStorage.setItem("affair-id", _id);
    localStorage.setItem("first", true);
    localStorage.setItem("affair-pid", pid);
  };



  const handleFav = async () => {
    if (isFav) {
      const foundFav = allFav.find((fav) => fav.affairId === _id);
      if (foundFav) {
        const favPid = foundFav.pid;
        const { data, error,isLoading } = await delFav({ pid: favPid });
        await refetch();
        
        if (data) {
          
          toastSuccess("Removed to favourites")

          setFavListChanged(Math.random());
          setfavChange(Math.random());
          setisFav(false);
        }
      }
    } else {
      setisFav(true);

      try {
        const data = await addFav({ affairName: affairName, affairId: _id });
        await refetch();
        if (data?.data?.pid) {
          
          toastSuccess("Added to favourites")
          setFavListChanged(Math.random());
          setfavChange(Math.random());
        }
      } catch (error) {
      }
    }
  };
  useEffect(() => {
    if (allFav && allFav != "No data found") {
      const isIdPresent = allFav.some((item) => item.affairId == _id);
      if (isIdPresent && !error) {
        setisFav(isIdPresent);
      }
    }
  }, [allFav]);

  return (
    <div
      className={`bg-background-1000  rounded-lg flex z-[0] flex-col  flex-auto
    w-full h-[320px]


    
    
    
    drop-shadow-md hover:scale-[1.01] transition-transform ease-in-out  aspect-video	`}
    >
      <div className="w-full h-[50%] ">
        <img src={thumbnail} className="h-full w-full rounded-t-lg" loading="lazy" />
      </div>

      <div className="h-1/2 bg-background-1000 w-full rounded-b-lg p-5 flex flex-col items-start justify-between  ">
        <p
          className="text-text-25  font-semibold text-[1.2rem] cursor-pointer line-clamp-1 "
          onClick={handleClick}
        >
          {affairName}
        </p>
        <p className="font-jakarta font-light text-[0.79rem] text-text-1000">
          {tags.join(",")}
        </p>

        <div className="flex items-center justify-between w-full ">
          <button
            className="text-text-25 font-jakarta font-light text-[0.72rem] bg-accent-100 flex items-center px-4 py-2 rounded-md gap-2 hover:bg-accent-200 transition-colors ease-in-out"
            onClick={handleClick}
          >
            Read affair <ArrowForwardIcon sx={{ fontSize: "1rem" }} />
          </button>
          <div>
            <button
              onClick={handleFav}
              className="p-1  rounded-md text-red-400 "
            >
              {isFav ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

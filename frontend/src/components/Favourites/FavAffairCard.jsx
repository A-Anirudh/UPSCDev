import React from "react";
import { toast } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
  useDeleteFavMutation,
} from "../../slices/favouriteSlice";
import { useDispatch } from "react-redux";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toastLoading, toastSuccess } from "../../utils/myToast";

export const FavAffairCard = ({
  _id,
  pid,
  affairName,
  tags,
  thumbnail,
  refetch,
}) => {
  const navigate = useNavigate();
  const [delFav] = useDeleteFavMutation();
  const handleClick = () => {
    navigate(`/affair/${_id}`);

  };

  const handleDel = async () => {
    const { data, error } = await delFav({ _id: _id });
    if (data) {
      await refetch();
      toastSuccess("Removed");
    } else {
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <div className="flex flex-col  gap-1 font-jakarta relative cursor-pointer hover:scale-[1.01] transition-transform ease-in-out" >
        <div className="w-full h-40 lg:h-28">
          <img
            src={thumbnail}
            className="h-full w-full rounded-lg " 
            loading="lazy"
            onClick={handleClick}
          />
        </div>
        <div className="p-1">
        <p
          className="text-text-25 font- text-[1.2rem]  line-clamp-1 "
            onClick={handleClick}
        >
          {affairName}
        </p>
        <p className="font-jakarta font-medium text-[0.79rem] text-background-700">
          {tags?.join(",")}
        </p>

        {/* <div className="flex items-center justify-between w-full "> */}
        <div className="absolute top-0  right-0  rounded-lg z-[999] "  style={{backdropFilter: "blur(5px)",backgroundColor:(0,0,0,0.5)}}>
        <button className="text-red-500 "  onClick={handleDel}>
            <CloseIcon />
          </button>
          </div>

        {/* </div> */}
      </div>
    </div>
  );
};

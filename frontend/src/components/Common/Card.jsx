import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteBorderOutlinedIcon, FavoriteIcon } from "../../utils/icons";

export const Card = ({ _id, pid, affairName, tags, thumbnail, language }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/affair/${_id}`);
  };

  return (
    <div className="w-full   hover:scale-[1.01] ">
      <div className="relative flex flex-col ">
        <div className="h-40 lg:h-28 aspect-video">
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
            {language==='Hindi' ? affairName.hi : affairName.en}
          </p>
          <p className="font-jakarta font-medium text-[0.79rem] text-background-700">
            {tags.join(",")}
          </p>
          <div className="flex items-center justify-between w-full "></div>
        </div>
      </div>
    </div>
  );
};

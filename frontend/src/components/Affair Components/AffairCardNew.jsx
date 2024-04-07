import React from "react";
import { useNavigate } from "react-router-dom";

export const AffairCardNew = ({
  _id,
  pid,
  affairName,
  tags,
  thumbnail,

}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/affair/${_id}`);
  };

  return (
    <div className="w-[240px] md:w-[250px] lg:w-[200px]  hover:scale-[1.01] ">
       <div className="relative flex flex-col ">
      <div className="h-40 lg:h-28 aspect-video cursor-pointer">
        <img
          src={thumbnail}
          className="h-full w-full rounded-lg "
          loading="lazy"
          onClick={handleClick}
        />
      </div>
      <div className="p-1">
        <p
          className="text-text-25 font- text-[1.2rem]  line-clamp-1 cursor-pointer "
          onClick={handleClick}
        >
          {affairName}
        </p>
        <p className="font-jakarta font-medium text-[0.79rem] text-background-700">
          {tags.join(",")}
        </p>
      </div></div>
    </div>
  );
};

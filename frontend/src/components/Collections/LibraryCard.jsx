import React from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../utils/icons";
import { useDeleteAffairFromCollectionMutation } from "../../slices/CollectionSlice";
import { toastSuccess } from "../../utils/myToast";

export const LibraryCard = ({ item ,refetch,playlistId,language}) => {
  const { articleId, _id, articleName, thumbnail } = item;
  const navigate = useNavigate();
  const [remove]=useDeleteAffairFromCollectionMutation()

  const handleClick = () => {
    navigate(`/affair/${articleId}`);
  };
const handleRemove=async()=>{
  try {
      const {data,error}=await remove({playlistId:playlistId ,articleId:articleId});
      if(data){
        await refetch()
        toastSuccess('Removed')
      
      }
      else{
        toast.error('Error in removing')
        console.log(error)
      }
  } catch (error) {
    toast.error('Error in removing')
    console.log(error)
  }

}
  return (
    <div className="w-full md:w-[250px] lg:w-[200px]  hover:scale-[1.01]">
    <div className="relative flex flex-col ">
      <div className=" w-fu ll  h-40 lg:h-28 aspect-video ">
        <img onClick={handleClick}
          src={thumbnail}
          className="h-full  rounded-lg bg-cover w-full"
          loading="lazy"
        />
      </div>
      <div className="p-1">
        <p
          className="text-text-25 font- text-[1.2rem]  line-clamp-1 "
          onClick={handleClick}
        >
          {language==='English' ? articleName.en : articleName.hi}
        </p>
      </div>
      <div className="absolute top-0  right-0  rounded-lg z-[999] "  style={{backdropFilter: "blur(5px)",backgroundColor:(0,0,0,0.5)}}>
        <button className="text-red-500 flex"  onClick={handleRemove}>
            <CloseIcon />
          </button>
          </div>
    </div>
    </div>
  );
};

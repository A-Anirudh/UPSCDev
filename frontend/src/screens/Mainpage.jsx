import React, { useState } from "react";
import {
  Banner,
  CAContainer,
  DailyQuiz,
  NonCAContainer,
  Quotes,
} from "../components";
import { useUserProfileQuery } from "../slices/usersApiSlice";
import { useSelector } from "react-redux";
import {
  useAddFavMutation,
  useDeleteFavMutation,
} from "../slices/favouriteSlice";
import { useNavigate } from "react-router-dom";

export const Mainpage = () => {
  const [allAffairs, setallAffairs] = useState();
  const [allAffairsCopy, setallAffairsCopy] = useState([]);
  const open = useSelector((state) => state.open.isOpen);
  const [myFavs, setmyFavs] = useState([]);
  const userData = useUserProfileQuery();
  const navigate = useNavigate();
  // API queries


  const [addFav] = useAddFavMutation();
  const [delFav] = useDeleteFavMutation();

  // Effect to update favorites and affairs data
  // useEffect(() => {
  //   if (favData?.data?.data) {
  //     setmyFavs(favData.data.data);
  //   }  }, [userData]);

  // useEffect(() => {
  //   if (data) {
  //     setallAffairs(data.subjectWiseData);
  //     setallAffairsCopy(data.subjectWiseData);
  //     // console.log(Object.keys(data.subjectWiseData));
  //   }
  // }, [data]);

  // Effect to update subscription status

  // Helper function to check if an affair is a favorite


  // Search handler

  // Handle favorite action


  // if (!allAffairs) {
  //   return <MainpageSkeletion />;
  // }

  return (
    <div>
      <Quotes />
      <div className="block md:hidden">
        <Banner />
      </div>

      <div className="flex flex-col lg:flex-row   w-[100%] bg-background-25 overflow-y-auto  ">
        <div className=" lg:w-[35%] xl:w-[30%]  2xl:w-[20%]  ">
          <div className=" flex font-jakarta  w-full items-center gap-4  text-text-25 bg-pin-800 px-10  md:px-5 flex-wrap  text-left">
          </div>
          <div className="p-3">
            <DailyQuiz />
          </div>
        </div>

        <div className=" w-fu ll h-full lg:w-[65%] xl:w-[70%]  2xl:w-[80%] ">
          {/* <Quotes /> */}
          <div className="hidden md:block">
            <Banner />
          </div>
          <CAContainer

          />
          <NonCAContainer
          />
        </div>
      </div>
    </div>
  );
};

//            className={`removeScroll grid overflow-auto p-3
// grid-cols-1 gap-4
// ${
//   open
//     ? "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-6"
//     : "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
// }
// `}
// style={{ maxHeight: `${height - 150}px` }}

import React, { useState, useEffect } from "react";
import { useGetLeaderBoardQuery } from "../slices/weeklyQuizSlice";
import crown from "../assets/crown.png";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";


export const LeaderBoard = () => {
  const { data, error, isLoading, refetch } = useGetLeaderBoardQuery( {}, 
    { refetchOnMountOrArgChange: true });
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [myPoints, setMyPoints] = useState(null);
  const [topRanks, settopRanks] = useState([]);

  useEffect(() => {
    if (!isLoading && data) {
      // console.log(data);
      setLeaderboardData(data.usersWithBadges);
      setMyRank(data.userRank);
      setMyPoints(data.userPoints);
      settopRanks(data.usersWithBadges.slice(0, 3));
    }
  }, [data, isLoading]);

  if(error){
    return(<div>Error while fetching  LeaderBoard</div>)
  }
  if(isLoading){
    return <div>Loading</div>
  }


  
  // bg-[radial-gradient(169.40%_89.55%_at_105%_9%,rgba(217,119,6,0.4)_0%,rgb(0,0,0,0.40)_90%)]
  return (
    <div className="  mx-auto md:w-3/4 xl:w-1/2 flex flex-col justify-center gap-5  p-2">
      <p className="text-3xl font-semibold">Leaderboard</p>
      <div className="flex flex-wrap gap-5   w-full ">
        {topRanks?.map((item, idx) => (
          <div
            className={`  flex flex-col flex-grow rounded-lg p-4 gap-3
            
            ${idx == 0 ? `border border-yellow-600 bg-background-1000 shadow-md` : ""}
                ${idx == 1 ? "border border-gray-300 bg-background-1000 shadow-md" : ""}
                ${idx == 2 ? "border border-amber-600 bg-background-1000 shadow-md" : ""}
            
            
            `}
            key={idx}
          >
            <div className="items-center flex justify-between ">
              <p className="text-xl font-bold">{item?.username}</p>
              <EmojiEventsIcon
              sx={{fontSize:"3rem"}}
                className={`
                ${idx == 0 ? "text-yellow-500" : ""}
                ${idx == 1 ? "text-gray-300" : ""}
                ${idx == 2 ? "text-amber-600" : ""}
                `}
              />
            </div>
            
            <p className="text-lg ">{item?.badgeName}</p>
            <div>
              <p className="text-background-500 text-sm">Points</p>
              <p className="text-background-500 text-sm">{item?.points}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-background-1000 rounded   text-sm shadow-lg">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th
                className={`p-2 text-center bg-background-100 text-xs text-gray-500 rounded-tl-lg`}
              >
                Rank
              </th>
              <th
                className={`p-2 text-center bg-background-100 text-xs text-gray-500`}
              >
                Name
              </th>
              <th
                className={`p-2 text-center bg-background-100 text-xs text-gray-500`}
              >
                Points
              </th>
              <th
                className={`p-2 text-center bg-background-100 text-xs text-gray-500 rounded-tr-lg`}
              >
                Badge
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {leaderboardData?.map((item, index) => (
              <tr
                key={index}
                className={` ${
                  leaderboardData.length - 1 == index
                    ? ""
                    : "border-b border-background-200"
                }
                ${
                  JSON.parse(localStorage.getItem("userInfo"))?.data?.id ==
                  item._id
                    ? "bg-text-100 text-whit e "
                    : ""
                }
                `}
              >
                <td className={` p-2 text-center `}>{index + 1}</td>
                <td className={` p-2 text-center `}>
                  {JSON.parse(localStorage.getItem("userInfo"))?.data?.id ==
                  item?._id
                    ? "You"
                    : item.username}
                </td>
                <td className={` p-2 text-center `}>{item.points}</td>
                <td className={` p-2 text-center  `}>{item.badgeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      <div className="bg-accent-500 w-full flex  items-center flex-wrap justify-evenly p-2 mt-3 text-white rounded-md shadow-lg">
        <p className="font-semibold">
          Your ranking : <span>{myRank}</span>
        </p>
        <p className="font-semibold">{data?.userBadgeName?.badgeName}</p>
        <p className="font-semibold">Points : {myPoints}</p>
      </div>
    </div>
  );
};

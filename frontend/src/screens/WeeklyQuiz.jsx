import React, { useEffect, useState } from "react";
import { LeaderBoard, WeeklyQuizComponent } from "../components";
import { useCheckAttemptedQuery } from "../slices/weeklyQuizSlice";

export const WeeklyQuiz = () => {
  const { data, isLoading, refetch } = useCheckAttemptedQuery();
  const [attempted, setattempted] = useState(false);
  const [prevAnswer, setprevAnswer] = useState(null);
  useEffect(() => {
    if (data) {
      // console.log(data)
      setattempted(data.alreadyAttempted);
      setprevAnswer(data.prevAnswer)
    }
  }, [data]);
  // useEffect(() => {
  //   console.log("mounted", prevAnswer);
  // }, [data,prevAnswer,isLoading]);  

  return (
    <div className="bg-red-6 00 w-full 2xl:w-3/4 mx-auto p-3 flex flex-col-reverse md:flex-row">
      <WeeklyQuizComponent
      prevAnswer={prevAnswer}
        isAttempted={attempted}
        refetch={refetch}
      />
    </div>
  );
};

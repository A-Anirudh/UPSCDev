import React, { useEffect, useState } from "react";
import {
  useGetWeeklyQuestionsQuery,
  useLazyGetSolutionQuery,
  useSubmitAnswersMutation,
} from "../../slices/weeklyQuizSlice";
import { toastSuccess } from "../../utils/myToast";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { LoadingIcon } from "../../loaders";
import { useTranslation } from "react-i18next";







export const WeeklyQuizComponent = ({ isAttempted, refetch, prevAnswer }) => {
  const { data, error, isLoading } = useGetWeeklyQuestionsQuery();
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setcorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState(
    JSON.parse(localStorage.getItem("userAnswers")) || {}
  );
  const [submit] = useSubmitAnswersMutation();
  const [answers] = useLazyGetSolutionQuery();
  const [finalSolnForm, setfinalSolnForm] = useState({
    solutions: [],
    correctAnswerCount: 0,
    wrongAnswerCount: 0,
  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [attempted, setattempted] = useState(isAttempted || false);
  const [t,i18n] = useTranslation("global");

  useEffect(() => {
    if (data && !isLoading) {
      setQuestions(data?.questions);
      const savedAnswers = JSON.parse(localStorage.getItem("userAnswers"));
      if (savedAnswers) {
        setUserAnswers(savedAnswers);
      }
    }
  }, [data, isLoading]);

  // useEffect(() => {

  //    console.log(finalSolnForm)
  // }, [finalSolnForm]);

  useEffect(() => {
    const fetchAns = async () => {
      // console.log('prevAnswer',prevAnswer)
      if (prevAnswer) {
        const { data, error } = await answers();
        if (data) {
          // console.log("solution in effect",data)
          setcorrectAnswers(data?.solutions);
          setUserAnswers(prevAnswer);
        }
      }
    };
    fetchAns();
  }, [prevAnswer]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("userAnswers");
    };
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "loading",
  //     loading,
  //     "isattempted",
  //     isAttempted,
  //     "attempted",
  //     attempted
  //   );
  // }, [loading, isAttempted, attempted]);

  //   useEffect(() => {
  // console.log("correctAnswers",correctAnswers)
  // console.log("userAnswers",userAnswers)
  //   }, [correctAnswers,userAnswers])

  const handleInputChange = (questionId, answer) => {
    setUserAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [questionId]: answer,
      };
      localStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  };
  const handleSubmit = async () => {
    setloading(true);
    const { data } = await answers();
    setloading(false);
    // console.log(data.solutions);
    setcorrectAnswers(data?.solutions);

    const finalSolnForm = await calculateResult(data.solutions); // Await here

    const solutionsArray = Object.entries(userAnswers).map(
      ([questionId, answer]) => ({
        user: JSON.parse(localStorage.getItem("userInfo")).data.id, // Set your user ID here
        question: questionId,
        solution: answer,
      })
    );

    const finalForm = {
      solutions: solutionsArray,
      correctAnswerCount: finalSolnForm.correctAnswerCount,
      wrongAnswerCount: finalSolnForm.wrongAnswerCount,
    };

    // console.log("Before", finalForm);
    const res = await submit(finalForm);

    if (res) {
      localStorage.removeItem("userAnswers");
      await refetch();
      setattempted(true);
      // console.log(userAnswers);
      toastSuccess("Answer submitted");
      // window.location.reload();
    } else {
      console.log("error", res);
    }
  };

  //   console.log("in quiz", isAttempted);
  const calculateResult = async (correctAnswers) => {
    const correctCount = correctAnswers.reduce((count, answer) => {
      if (userAnswers[answer._id] === answer.solution) {
        return count + 1;
      }
      return count;
    }, 0);
    const wrongCount = questions.length - correctCount;
    const finalSolnForm = {
      solutions: userAnswers,
      correctAnswerCount: correctCount,
      wrongAnswerCount: wrongCount,
    };
    return finalSolnForm; // Return the result
  };

  if (error) {
    return <div>{{error}}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-1 md:p-4">

      <div className="w-full">
        {/* <p className={`text-3xl font-medium text-red-600 mb-1 text-center  ${attempted || isAttempted ? "block":'hidden'}`}>Already attempted</p> */}
        <p
          className={` text-center mb-1 ${
            attempted || isAttempted ? "block" : "hidden"
          }`}
        >
          {t('weeklyQuiz.attemptedMessage')}
        </p>
        <button
          className={`  text-center bg-primary-500 font-medium  mx-auto px-3 py-1 rounded text-white hover:bg-primary-600 ${
            attempted || isAttempted ? "block" : "hidden"
          }`}
          onClick={() => navigate("/leaderboard")}
        >
          {t('weeklyQuiz.leaderboard')}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">{t('weeklyQuiz.title')}</h1>
      {questions?.map((question, idx) => (
        <div key={question?._id} className="mb-6">
          <h2 className="text-lg font-semibold">
            {idx + 1} . {question.question}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            {question?.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center mb-2 container  border border-background-100 rounded p-2
                justify-between
                `}
              >
                <input
                  type="radio"
                  disabled={isAttempted || attempted}
                  id={`option-${question._id}-${index}`}
                  name={`question-${question._id}`}
                  value={option}
                  onChange={() => handleInputChange(question._id, option)}
                  className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-primary-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 mr-2 p-2"
                  checked={userAnswers[question._id] === option}
                />
                <label
                  htmlFor={`option-${question._id}-${index}`}
                  className="w-full text-left line-clamp-1"
                >
                  {option}
                </label>
                <div className="flex items-center gap-2 w-max">
                <p className={`${userAnswers[idx]?.solution==option?"block w-max":"hidden"}`}>Your answer : </p>
                <div
                  className={` rounded-sm
                ${
                  correctAnswers[idx]?.solution != userAnswers[idx]?.solution &&
                  option == userAnswers[idx]?.solution
                    ? "bg-red-600 text-white"
                    : "hidden"
                }
                `}
                >
                  <CloseIcon />
                </div>
                <div
                  className={`rounded-sm
                ${
                  (correctAnswers[idx]?.solution ===
                    userAnswers[idx]?.solution &&
                    correctAnswers[idx]?.solution == option) ||
                  (correctAnswers[idx]?.solution !=
                    userAnswers[idx]?.solution &&
                    option == correctAnswers[idx]?.solution)
                    ? "bg-green-600 text-white font-bold"
                    : "hidden"
                }
               
                `}
                >
                  <DoneIcon />
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-3 items-center">
        <button
          className="bg-primary-500 text-white px-4 py-2 rounded disabled:bg-primary-700 w-full md:w-fit flex text-center disabled:cursor-not-allowed"
          disabled={loading ^ isAttempted ^ attempted}
          onClick={handleSubmit}
        >
          {loading ? <LoadingIcon /> : null}
          <p className="text-center w-full">{loading ? "Loading..." : t('weeklyQuiz.submit')}</p>
        </button>
        <button
          className={`  text-center    px-3 py-1 rounded w-full md:w-fit  ${
            attempted || isAttempted ? "block" : "hidden"
          }`}
          onClick={() => navigate("/leaderboard")}
        >
          {t('weeklyQuiz.viewLeaderboard')}
        </button>
      </div>
    </div>
  );
};

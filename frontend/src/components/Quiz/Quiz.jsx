import React, { useState, useEffect } from "react";
import {
  useGetQuestionsQuery,
  useLazyGetSolutionsQuery,
} from "../../slices/quizSlice";
import {KeyboardArrowDownIcon,KeyboardArrowUpIcon,LockIcon} from "../../utils/icons";
import { useNavigate } from "react-router-dom";


export const Quiz = ({ id }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const { data: questions, error, isLoading } = useGetQuestionsQuery(id);
  const [allQuestions, setAllQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const isLastQuestion = currentQuestionIndex === allQuestions?.length - 1;
  const [getSolution] = useLazyGetSolutionsQuery();
  const [marks, setmarks] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (questions) {
      setAllQuestions(questions.questions);
      setSelectedOptions(new Array(questions.questions.length).fill(null));
    }
  }, [questions]);

  const handleOptionChange = (selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[currentQuestionIndex] = selectedOption;
      return newSelectedOptions;
    });
  };

  const handleStartQuiz = () => {
    setIsOpen(true);
    setQuizStarted(true);
    setmarks(null);
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    // Perform actions to submit the quiz, e.g., send data to the server
    const { data, error } = await getSolution(id);
    //checking for how many correct answers
    let correctCount = 0;
    let total = data?.solutions.length;

    selectedOptions.forEach((selectedOption, index) => {
      const correctAnswer = data?.solutions[index]?.solution;
      if (selectedOption === correctAnswer) {
        correctCount++;
      }
    });

    setmarks(String(correctCount) + "/" + String(total));
    setQuizStarted(false);
  };

  if (!quizStarted && !marks) {
    return (
      <div className=" w-full mx-auto p-9 rounded-md   text-center">
        <button
          className="bg-accent-400 text-white px-6 py-3 rounded-md"
          onClick={handleStartQuiz}
        >
          Attempt Quiz
        </button>
      </div>
    );
  }

  if (marks) {
    return (
      <div className=" w-full mx-auto p-9 rounded-md shadow-md text-center flex flex-col gap-4 items-center mt-3  bg-background-1000 transition-all ease-in-out ">
        <p className="text-center  text-2xl font-semibold text-accent-400">
          Your score
        </p>
        <p className="text-center font-bold text-3xl">{marks}</p>
        <button
          className="bg-accent-400 text-white px-6 py-3 rounded-md w-fit"
          onClick={() => {
            setQuizStarted(false);
            setmarks(null);
          }}
        >
          Finish Quiz
        </button>
        <button
          className="border border-accent-400 text-text-25 px-6 py-3 rounded-md w-fit"
          onClick={handleStartQuiz}
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching quiz questions:", error);
    return (
      <div className="flex  items-center gap-4 bg-background-1000 p-4 rounded-md mt-3">
        <LockIcon />
        {"Buy premium to unlock quiz"}
        <button
          className="bg-primary-500 text-white px-5 py-2 rounded-lg hover:bg-primary-600 disabled:bg-primary-100"
          onClick={() => {
            navigate("/buy-subscription");
          }}
        >
          Buy subscription
        </button>
      </div>
    );
  }

  if (!questions || !allQuestions || allQuestions.length === 0) {
    return <div className="bg-background-1000 p-4 rounded-md mt-3">No questions available</div>;
  }

  if (currentQuestionIndex < 0 || currentQuestionIndex >= allQuestions.length) {
    return <div className="bg-background-1000 p-4 rounded-md mt-3">Invalid question index</div>;
  }


  const currentQuestion = allQuestions[currentQuestionIndex];

  return (
    <div className="py-2  rounded-md p-4 shadow-md bg-background-1000 mt-3">
      <button
        className="accordion-title w-full text-left p-2 rounded-md flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className={`text-xl font-jakarta font-semibold `}>Quiz</p>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 p-5">
            <p className="text-red-500 ">*Data is not saved</p>

            <p className="p-2 md:text-2xl text-xl font-semibold font-jakarta ">
              {currentQuestion.question}
            </p>
            <ul className="">
              {currentQuestion.options.map((option, index) => (
                <li className="list-none p-2" key={index}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}`}
                      value={option}
                      checked={selectedOptions[currentQuestionIndex] === option}
                      onChange={() => handleOptionChange(option)}
                      className="form-radio text-accent-400 focus:ring-accent-400 h-4 w-4"
                    />
                    <span className="">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              {currentQuestionIndex > 0 && (
                <button
                  className="bg-black  px-4 py-2 text-white rounded-md mr-2"
                  onClick={handleBackClick}
                >
                  Back
                </button>
              )}
              {isLastQuestion ? (
                <button
                  className="bg-primary-500 text-white px-4 py-2 rounded-md"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  className="bg-primary-500 text-white px-4 py-2 rounded-md mb-2"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

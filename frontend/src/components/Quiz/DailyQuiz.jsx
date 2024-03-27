import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';
import { useGetDailyQuizQuery, useGetDailyQuizSolutionQuery } from "../../slices/dailyQuizSlice";
import { DailyQuizSkeleton } from "../../loaders";
import { useDispatch, useSelector } from "react-redux";
import { setdailyquizopen } from "../../slices/quizOpenSlice";

export const DailyQuiz = () => {
  const getDailyQuizQuestions=useGetDailyQuizQuery()
  const getDailyQuizSolution=useGetDailyQuizSolutionQuery()

  const [questions, setquestions] = useState()
  const[answer,setanswer]=useState()
  // const [finish, setfinish] = useState(false)
  const [correct, setCorrect] = useState(false);
  const [selected, setSelected] = useState();



  useEffect(() => {
    if(getDailyQuizQuestions.data && getDailyQuizSolution.data){
      setquestions(getDailyQuizQuestions?.data?.questions[0])
      setanswer(getDailyQuizSolution?.data?.solutions[0].solution)
    }
  }, [getDailyQuizQuestions,getDailyQuizSolution])
  


const handleClose = () => {

  setCorrect(false);
  // setfinish(false)
  setSelected(""); // Clear the selected radio button

  // dispatch(setdailyquizopen(false));
};






if(!questions || !answer){
  return <DailyQuizSkeleton/>
}
  return (

      // <div className="bg-red-500 w-full h-full flex items-center justify-center text-text-25">
        <div className={` bg-background-1000  w-full  font-jakarta text-text-25 rounded-lg drop-shadow  `}>
          <div className="w-full border-b flex items-center justify-between border-gray-500">
            <p className="px-5 py-3 text-2xl font-semibold  "> Daily quiz</p>
          </div>

          <div className="p-5 pt-0 ">
            <p className="p-2 md:text-xl text-md font-semibold  ">{questions?.question}</p>
            <ul className="bg-background-50 rounded-md p-3">
              {questions?.options.map((option, index) => (
                <li className="list-none p-2" key={index}>
                  <label
                  
                    className={`flex items-center space-x-2 cursor-pointer p-1 rounded 
                     `}
                  >
                    <input
                      type="radio"
                      disabled={correct}
                      name="option"
                      value={option}
                      // checked={finish}
                      onChange={(e) => {
                        setSelected(e.target.value);
                        // setfinish(false)
                      
                      }}
                      className="text-accent-400 focus:ring-accent-400 h-4 w-4"
                    />
                    <span className="">{option}</span>
                  </label>
                </li>
              ))}

              <button className="px-5 py-2 bg-primary-500 md:mx-2 rounded-full text-white w-full md:w-fit my-2" onClick={()=>{setCorrect(true)}}>
                Submit
              </button>

              <button className="px-5 py-2 border border-primary-500 md:mx-2 rounded-full w-full md:w-fit" onClick={handleClose}>
                Retake
              </button>
              <div className={`${correct?"block":"hidden"} p-3`}>
              {selected?.trim()===answer?.trim()?<p className="text-green-600 text-xl font-medium flex items-center"><CheckIcon/> Correct answer</p>:<p className="text-red-500 text-xl font-medium flex items-center"><CloseIcon/> Wrong answer</p>}
              <p className="">Your answer : {selected}</p>
              <p>Correct answer : {answer}</p>

            </div>
            </ul>

          </div>
        </div>
      // </div>
    // </section>
  );
};

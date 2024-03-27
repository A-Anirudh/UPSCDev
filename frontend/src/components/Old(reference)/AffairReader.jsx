import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneAffairQuery } from "../../slices/affairSlice";
import { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LockIcon from "@mui/icons-material/Lock";
import {
  useAddContinueReadingMutation,
  useGetContinueReadingQuery,
  useIsSubQuery,
} from "../../slices/usersApiSlice";
import { useSelector } from "react-redux";
import { Quiz } from "../Quiz";
import { ReaderSkeleton } from "../../loaders";
import { Accordion } from "./Accordion";

export const AffairReader = ({pid}) => {
  const isSubIni = useIsSubQuery();

  const [ispro, setispro] = useState(false);
  const { data, isLoading } = useGetOneAffairQuery(pid);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const scrollPositionRef = useRef();
  const [affairData, setaffairData] = useState();
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [scrollPosition, setscrollPosition] = useState();
  const [addContinue] = useAddContinueReadingMutation();
  const getContinue = useGetContinueReadingQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [continueReading, setcontinueReading] = useState();
  const [highlightedSegments, setHighlightedSegments] = useState([]);


  const navigate = useNavigate();
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  if(isLoading){return <ReaderSkeleton/>}
   
  // useEffect(() => {
  //   setcontinueReading(getContinue?.data?.data?.continueReading);
  //   if (continueReading) {
  //     getScrollPoistion(localStorage.getItem("affair-id"));
  //   }
  // }, [getContinue, continueReading, scrollPosition]);

  // const handleScroll = () => {
  //   const mainContainer = document.querySelector(".main-container");
  //   if (mainContainer) {
  //     scrollPositionRef.current = mainContainer.scrollTop;
  //   }
  // };

  // useEffect(() => {
  //   const mainContainer = document.querySelector(".main-container");

  //   if (mainContainer) {
  //     mainContainer.addEventListener("scroll", handleScroll);
  //   }

  //   // Cleanup: Remove the event listener when the component unmounts
  //   return async () => {
  //     if (mainContainer) {
  //       if (localStorage.getItem("affair-id")) {
  //         await addContinue({
  //           articleId: localStorage.getItem("affair-id"),
  //           continueFrom: scrollPositionRef.current,
  //         });
  //         mainContainer.scrollTop = Number(scrollPositionRef.current);

  //         mainContainer.removeEventListener("scroll", handleScroll);
  //       }
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (data?.data) {
      setaffairData(data?.data[0]);
    }
  }, [data]); 

  useEffect(() => {
    if (!pid) {
      setpid(localStorage.getItem("affair-pid"));
    }
  }, [pid]);

  //highlight logic
  const handleHighlight = (event) => {
    const selection = window.getSelection();

    const selectedText = selection.toString();
    if (selectedText) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.backgroundColor = "yellow";
      span.textContent = selectedText;
      range.surroundContents(span);

      const startOffset = range.startOffset;
      const endOffset = range.endOffset;

      setHighlightedSegments([
        ...highlightedSegments,
        {
          startOffset: startOffset,
          endOffset: endOffset,
        },
      ]);
    }
  };



  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    audioRef.current.playbackRate = speed;
  };

  const startOver = () => {
    audioRef.current.currentTime = 0;
  };

  useEffect(() => {
    if (isSubIni) {
      setispro(isSubIni?.data?.data);
    }
  }, [isSubIni, ispro]);

  // const getScrollPoistion = (articleId) => {
  //   console.log('cont',continueReading)
  //   const foundArticle = continueReading.find(
  //     (article) => article.article === articleId
  //   );

  //   // Check if the article was found
  //   if (foundArticle) {
  //     const mainContainer = document.querySelector(".main-container");
  //     mainContainer.scrollTop = Number(foundArticle.continueFrom);
  //     scrollPositionRef.current = Number(foundArticle.continueFrom);
  //   } else {
  //     return "Article not found";
  //   }
  // };
 
return (
    <section className="main-container p-2 md:p-5 pb-10  h-full">
      <p className=" text-center font-semibold text-[2rem] md:text-[3rem]">
        {affairData?.affairName}
      </p>
      <p className=" text-center font-semibold text-sm md:text-[1rem] flex justify-center gap-6 text-primary-800    ">
        <span>{affairData?.startDate.slice(0, 10)}</span>to
        <span>{affairData?.endDate.slice(0, 10)}</span>
      </p>
      <div className="flex gap-6 flex-wrap self-center my-4 justify-center">
        {affairData?.tags.map((item, index) => (
          <div
            key={index}
            className="capitalize font-[poppins] font-light bg-accent-500 text-white rounded-md px-2 py-1 text-[0.7rem]"
          >
            {item}
          </div>
        ))}
      </div>





        
      <Quiz id={localStorage.getItem("affair-id")} />
      
          







      <div></div>
      <p
        className="p-4 font-jakarta w-full h-screen pb-10 "
        dangerouslySetInnerHTML={{
          __html: affairData?.article,
        }}
      ></p>
    </section>
  );
};

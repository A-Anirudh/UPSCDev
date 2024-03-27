import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneAffairQuery } from "../../slices/affairSlice";
import { useGetEventsQuery } from "../../slices/eventSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TimelineCard } from "../TimelineCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AffairReader, EventReader } from "..";
import { AEReaderSkeleton } from "../../loaders";
import { useAddContinueReadingMutation, useGetContinueReadingQuery } from "../../slices/usersApiSlice";


export const AEReaderContainer = () => {

  let _id;
const{pid,id}=useParams()

  const [eventData, seteventData] = useState();
  const [eventPid, seteventPid] = useState();
  const [aff_pid, setaff_pid] = useState(pid);
  const [isOpen, setIsOpen] = useState(false);
  const [e_pid, sete_pid] = useState(localStorage.getItem("e_pid"));
  const [scrollPosition, setscrollPosition] = useState();
  const { data, isLoading, error, refetch } = useGetOneAffairQuery(
    pid,
    {},
    { refetchOnMountOrArgChange: true }
  );

  // console.log('Afairr data',data)

  const scrollPositionRef = useRef();

  const [addContinue] = useAddContinueReadingMutation();
  const getContinue = useGetContinueReadingQuery(
    {}, 
    { refetchOnMountOrArgChange: true }
  );
  const [continueReading, setcontinueReading] = useState();

  const navigate = useNavigate();

  try {
    _id = localStorage.getItem("affair-id");
  } catch (error) {
    window.location.reload();
  }

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };



  const handleBack = async () => {
    localStorage.setItem("all", true);
    navigate("/all-affairs");
    localStorage.removeItem("e_pid");
  };


  const eventRawData = useGetEventsQuery(id);

  useEffect(() => {
    try {
      if (data && eventRawData.data) {
        seteventData(eventRawData.data.data);
      } else {
        refetch();
      }
    } catch (error) {
    }
  }, [data, eventRawData, error]);

  const [readAffair, setreadAffair] = useState(
    localStorage.getItem("affair-article") === "true" ? true : false
  );

  const handleReadAffair = () => {
    setreadAffair((prev) => {
      const newValue = !prev;
      if (newValue) {
        localStorage.removeItem("e_pid");
      }
      localStorage.setItem("affair-article", newValue);
      return newValue;
    });
  };

  useEffect(() => {
    setcontinueReading(getContinue?.data?.data?.continueReading);
    if (continueReading) {
      getScrollPoistion(localStorage.getItem("affair-id"));
    }
  }, [getContinue, continueReading, scrollPosition]);

  const handleScroll = () => {
    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
      scrollPositionRef.current = mainContainer.scrollTop;
    }
  };

  
  useEffect(() => {
    const mainContainer = document.querySelector(".main-container");

    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll);
    }

    // Cleanup: Remove the event listener when the component unmounts
    return async () => {
      if (mainContainer) {
        if (localStorage.getItem("affair-id")) {
          await addContinue({
            articleId: localStorage.getItem("affair-id"),
            continueFrom: scrollPositionRef.current,
          });
          mainContainer.scrollTop = Number(scrollPositionRef.current);

          mainContainer.removeEventListener("scroll", handleScroll);
        }
      }
    };
  }, []);

  
  const getScrollPoistion = (articleId) => {
    const foundArticle = continueReading.find(
      (article) => article.article === articleId
    );

    // Check if the article was found
    if (foundArticle) {
      const mainContainer = document.querySelector(".main-container");
      if(mainContainer)
      mainContainer.scrollTop = Number(foundArticle.continueFrom);
      scrollPositionRef.current = Number(foundArticle.continueFrom);
    } else {
      return "Article not found";
    }
  };


  if (isLoading && !eventData) return <AEReaderSkeleton/>;


  return (
    <div className={`h-full w-full flex flex-col  `}>
      <div className="flex  items-center justify-between gap-5 px-3 md:px-5  ">
        <button className=" flex font-[poppins] p-2 " onClick={handleBack}>
          <ArrowBackIcon />
          Go Back
        </button>
        <button
          className="block border border-primary-200 px-6 py-2 rounded-xl bg-primary-400 text-white hover:bg-primary-500 font-[poppins] my-4"
          onClick={handleReadAffair}
        >
          Read Affair
        </button>
      </div>

      <section className="flex flex-col    h-fit md:px- " key={eventPid}>
        <div className="p-5  rounded-md   bg-background-1000 my-4 mx-2 z-[99] border border-background-100 ">
          <button
            className="accordion-title w-full text-left p-2 rounded-md flex items-center justify-between"
            onClick={toggleAccordion}
          >
            <p className="text-xl font-jakarta font-semibold">Timeline</p>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </button>

          <div
            className={`grid  transition-all duration-700 ease-in-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden ">
              <div
                className={`grid overflow-auto  snap-x pb-3 w-full py-5 grid-rows-1`}
              >
                <div className="">
                  <div className="flex  ">
                    {eventData?.map((items, index) => (
                      <TimelineCard
                        key={items.pid}
                        pid={items.pid}
                        eventName={items.eventName}
                        startDate={items.startDate}
                        endDate={items.endDate}
                        _id={items._id}
                        onClick={(clickedPid) => {
                          sete_pid(clickedPid);
                          localStorage.setItem("e_pid", items.pid);
                          localStorage.setItem("affair-article", false);
                          setreadAffair(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>        
      <div className=" overflow-y-auto main-container overflow-x-hidden ">
          {!localStorage.getItem("e_pid") || readAffair ? (
            <AffairReader />
          ) : (
            <EventReader key={e_pid} pid={e_pid} />
          )}
        </div>
    </div>
  );
};
//pb-5  h-[60%] sm:h-[75%] md:h-[80%] lg:h-[70%] xl:h-[75%]
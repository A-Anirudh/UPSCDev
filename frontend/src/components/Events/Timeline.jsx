import React, { useEffect, useState } from "react";
import { TimelineCard } from "./TimelineCard";
import { useGetEventsQuery } from "../../slices/eventSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSearchParams } from "react-router-dom";
;

export const Timeline = ({ id }) => {
  const [eventData, seteventData] = useState([]);
  const { data, error, refetch, isLoading } = useGetEventsQuery(id);
  const [isOpen, setIsOpen] = useState(false);
  const [params, setparams] = useSearchParams({'read-affair':null});
  const [visisble, setvisisble] = useState(true)

  useEffect(() => {
    try {
      if (data) {
        seteventData(data.data);
      }
    } catch (error) {}
  }, [data, isLoading]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleClick=(pid)=>{
 
    setparams({ 'read-affair': false,'event': pid});

  }

  useEffect(() => {

    if(eventData==[] || eventData?.length==0){
      setvisisble(false)
      }
      else{
      setvisisble(true)

      }
  }, [eventData])


  


  return (
    <div className={`p-5  rounded-md   bg-background-1000 my-4 mx-2  border border-background-100 ${visisble?"":"hidden"}`}>
      <button
        className="accordion-title w-full text-left p-2 rounded-md flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <p className="text-xl font-jakarta font-semibold">Timeline</p>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>

      <div
        className={`grid  transition-all duration-700 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
                    onClick={()=>handleClick(items.pid)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

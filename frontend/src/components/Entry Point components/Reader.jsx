import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Timeline } from "../Events/Timeline";
import { AffairReaderNew } from "../Affair Components/AffairReaderNew";
import { EventReaderNew } from "../Events/EventReaderNew";
import { AddIcon, ShareIcon } from "../../utils/icons";
import { toastSuccess } from "../../utils/myToast";
import toast from "react-hot-toast";
import { Modal } from "../../utils/Modal";
import { AddCollection } from "../Collections/AddCollection";
import { useGetAllCollectionsQuery } from "../../slices/CollectionSlice";
import { useAddContinueReadingMutation, useGetContinueReadingQuery } from "../../slices/usersApiSlice";

export const Reader = () => {
  const [params, setparams] = useSearchParams({});
  const isAffair = params.get("read-affair") === null;
  const {  id } = useParams();
  const user = localStorage.getItem("userInfo") ? true : false;
  const navigate = useNavigate();
  const [addToOpen, setaddToOpen] = useState(false);
  const { data, error, isLoading,refetch } = useGetAllCollectionsQuery();
  const [collectionData, setcollectionData] = useState();
  const [addContinue] = useAddContinueReadingMutation();
  const getContinue = useGetContinueReadingQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [continueReading, setcontinueReading] = useState();
  const [scrollPosition, setscrollPosition] = useState();
  const scrollPositionRef = useRef();
  let clipPosition=localStorage.getItem('clip')
  useEffect(() => {
    if (data) {
      setcollectionData(data?.data);
    }
  }, [data]);

  const handleBack = async () => {
    localStorage.setItem("selected", "Affair");
    navigate("/affair?all=true");
  };

  const handleReadAffair = () => {
    setparams((prev) => {
      prev.delete("read-affair");
      prev.delete("event");

      return prev; // Remove the read-affair parameter
    });
  };

  const handleCopy=()=>{
      const link=window.location.href
      navigator.clipboard.writeText(link)
      .then(() => {
        toastSuccess('Link copied');
    })
    .catch(err => {
        toast.error('Unable to copy link');
    });
  }
  useEffect(() => {
    setcontinueReading(getContinue?.data?.data?.continueReading);
    if (continueReading) {
      getScrollPosition(id);
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
        if (id) {
          await addContinue({
            articleId:id,
            continueFrom: scrollPositionRef.current,
          });
          mainContainer.scrollTop = Number(scrollPositionRef.current);

          mainContainer.removeEventListener("scroll", handleScroll);
        }
      }
      localStorage.removeItem('clip')
    };
  }, []);



  
  const getScrollPosition = (articleId) => {
    const foundArticle = continueReading.find(
      (article) => article.article === articleId
    );

    // Check if the article was found
    if(clipPosition){
      const mainContainer = document.querySelector(".main-container");
      mainContainer.scrollTop = Number(clipPosition);
      scrollPositionRef.current = Number(clipPosition);
    }
    else if (foundArticle) {
      const mainContainer = document.querySelector(".main-container");
      mainContainer.scrollTop = Number(foundArticle.continueFrom);
      scrollPositionRef.current = Number(foundArticle.continueFrom);
    } else {
      return "Article not found";
    }
  };



  return (
    <section className=" main-container w-full overflow-y-auto overflow-x-hidden  h-[87vh]  md:h-[90vh] lg:h-[85vh] xl:h-[88vh] 2xl:h-[90vh] sidebar">
    <section className="w-full   md:w-3/4 lg:w-1/2 flex flex-col   main-container  text-text-25 font-jakarta mx-auto    ">
      <div className="flex items-center w md:gap-5 px-3 md:px-5  bg-background-50 sticky top-0 z-[100] justify-between">
        <button className=" flex  p-2  items-center gap-4" onClick={handleBack}>
          <ArrowBackIcon />
          <span className="hidden md:block">Go Back</span>
        </button>

        <div className="flex gap-2 items-center ">
          
          <button onClick={()=>setaddToOpen(true)}><span className="p-[0.4rem] rounded-full text-text-25 flex items-center bg-background-100 hover:bg-background-200"><AddIcon/></span></button>
         <button onClick={handleCopy} 
         className="p-2 rounded-full text-text-25 flex items-center bg-background-100 hover:bg-background-200 "><ShareIcon className={'text-[1.2rem]'}/></button>
          <button
            className="block border border-primary-200 px-6 py-2 rounded-xl bg-primary-400 text-white hover:bg-primary-500 my-4"
            onClick={handleReadAffair}
          >
            Read Affair
          </button>
        </div>
      </div>
      <Timeline id={id} />
      <div className="">
        {isAffair ? <AffairReaderNew  id={id} /> : <EventReaderNew />}
      </div>
      <Modal open={addToOpen} setOpen={setaddToOpen}>
          <AddCollection id={id} setOpen={setaddToOpen} collectionData={collectionData} refetch={refetch} error={error}/>
      </Modal>
    </section>
    </section>
  );
};


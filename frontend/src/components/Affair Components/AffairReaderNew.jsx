import React, { useEffect, useRef, useState } from "react";
import { useGetOneAffairQuery } from "../../slices/affairSlice";
import { Accordion, AudioPlayer, Quiz } from "..";
import { Helmet } from "react-helmet";
import { Modal } from "../UIComponents";
import { AddClip } from "../Clips/AddClip";
import { convert } from "html-to-text";

export const AffairReaderNew = ({ pid, id, language }) => {
  const { data, isLoading } = useGetOneAffairQuery(id);
  const [affairData, setAffairData] = useState();
  const [selectedText, setSelectedText] = useState("");
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 }); // State to hold popover position
  const [open, setopen] = useState(false);
  const scrollPositionRef = useRef();
  const [scroll, setscroll] = useState(0);
  

  useEffect(() => {
    if (data) {
      setAffairData(data.data[0]);
    }
  }, [data, isLoading]);

  const handleHighlight = (event) => {
    const cursorX = event.clientX; // Cursor position along the X-axis
    const cursorY = event.clientY; // Cursor position along the Y-axis
    const windowWidth = window.innerWidth; // Width of the window
    const windowHeight = window.innerHeight; // Height of the window
    const mappedX = (cursorX / windowWidth) * 100; // Mapping cursor position to window width percentage
    const mappedY = (cursorY / windowHeight) * 100; // Mapping cursor position to window height percentage
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    const scrollY = window.scrollY * 100; // Mapping vertical scroll position

    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
      scrollPositionRef.current = mainContainer.scrollTop;
      setscroll(scrollPositionRef.current);
    }

    // console.log("scroll poist", scrollPositionRef.current);

    if (selectedText) {
      setSelectedText(selectedText);
      const rect = selection.getRangeAt(0).getBoundingClientRect();
      setPopoverPosition({ top: mappedY, left: mappedX });
    }
  };


  return (
    <>
      <Helmet>
        <title>{language==='English' ? affairData?.affairName.en : affairData?.affairName.hi}</title>
      </Helmet>
      <Helmet>
        <meta
          name="description"
          content={
            convert(affairData?.article, {
              wordwrap: false,
              selectors: [
                { selector: "img", format: "skip" },
                { selector: "button", format: "skip" },
              ],
            }).slice(0, 300) + "..."
          }
        />
      </Helmet>
      <section className="main-container p-2 md:p-5 pb-10 h-full">
        <p className="font-[Montserrat]ont-[Montserrat] text-center font-semibold text-[2rem] md:text-[3rem]">
          {language==='English' ? affairData?.affairName.en : affairData?.affairName.hi}
        </p>
        <p className="font-[Montserrat] text-center font-semibold text-sm md:text-[1rem] flex justify-center gap-6 text-primary-800    ">
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
        <Accordion title={"Summary"} content={language==='English' ? affairData?.summary.en : affairData?.summary.hi } />
        <Quiz id={id} />
        <AudioPlayer audioLink={affairData?.audio} />
        <p
          className="p-4 font-[inter] w-full  pb-4 relative"
          onMouseUp={handleHighlight}
          onMouseDownCapture={() => {
            setSelectedText(null);
            window.getSelection().removeAllRanges();
          }}
          dangerouslySetInnerHTML={{
            __html: language==='English' ? affairData?.article.en : affairData?.article.hi,
          }}
        ></p>
        {selectedText && (
          <div
            className=" rounded-md  absolute "
            style={{
              top: `${popoverPosition.top}%`,
              left: `${popoverPosition.left}%`,
            }}
          >
            <button
              onClick={() => {
                setopen(true);
              }}
              className="bg-background-50 shadow-md font-bold px-4 py-2 rounded-md border border-background-100 "
            >
              Clip it
            </button>
          </div>
        )}
        <Modal open={open} setOpen={setopen}>
          <AddClip
            id={id}
            selectedText={selectedText}
            setSelectedText={setSelectedText}
            open={open}
            setOpen={setopen}
            position={scroll}
          />
        </Modal>
      </section>
    </>
  );
};

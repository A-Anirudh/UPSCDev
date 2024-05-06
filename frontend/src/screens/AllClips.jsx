import React, { useState, useEffect, useRef } from "react";
import { useGetClipsQuery } from "../slices/clipSlice";
import { ClipCard } from "../components";
import { Modal } from "../components/UIComponents"
import { CloseIcon, LeftIcon } from "../utils/icons";
import { useTranslation } from "react-i18next";

export const AllClips = () => {
  const { data, error, isLoading, refetch } = useGetClipsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [allClips, setAllClips] = useState([]);
  const [clip, setClip] = useState("");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [t,i18n] = useTranslation("global");

  useEffect(() => {
    if (data) {
      setAllClips(data.data);
    }
  }, [data, isLoading]);

  const sliderRef = useRef(null);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClips = allClips.filter((item) =>
    item?.clip.toLowerCase().includes(searchQuery.toLowerCase()) ||item?.clipName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className={`xl:w-3/4 h-full mx-auto `}>
      <div className="p-4 md:px-10 md:py-5 rounded my-2 text-text-25 w-full">
        <div className="flex justify-between md:items-center mb-5 flex-col md:flex-row ">
          <p className="md:text-3xl text-2xl font-semibold my-5">
            {t('clips.title')}
          </p>
          <input
            type="text"
            placeholder="Search clips..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-accent-500 bg-transparent md:w-fit w-full"
          />
        </div>
        <p className={`text-background-500 ${allClips.length==0 ?"block":"hidden"}`}>Select text in article to create Clips</p>
        <section className="grid  gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-3 2xl:grid-cols-5 justify-items-center">
          {filteredClips.map((item, idx) => (
            <ClipCard
              _id={item?._id}
              key={idx}
              clip={item?.clip}
              clipName={item?.clipName}
              setclip={setClip}
              setopen={setOpen}
              refetch={refetch}
              affairId={item?.affairId}
              clipPosition={item?.clipPosition}

            />
          ))}
        </section>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="flex flex-col overflow-auto  p-5   max-h-[90vh] mt-[8vh] max-w-[350px] md:w-auto bg-background-1000 rounded-md">
          <div className="w-full flex items-center justify-between mb-5">
            <p className=" text-xl font-bold ">Clip details</p>
            <button className="text-gray-500" onClick={() => setOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <p className="">{clip}</p>
        </div>
      </Modal>
    </div>
  );
};

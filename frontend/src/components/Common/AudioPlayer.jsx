import React, { useEffect, useRef, useState } from "react";
import { useIsSubQuery } from "../../slices/usersApiSlice";
import{PlayCircleIcon,PauseCircleIcon,RestartAltIcon} from'../../utils/icons'

export const AudioPlayer = ({ audioLink }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [ispro, setispro] = useState(false);
  const isSubIni = useIsSubQuery();

  useEffect(() => {
    if (isSubIni) {
      setispro(isSubIni?.data?.data);
    }
  }, [isSubIni, ispro]);

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

  return (
    <div
      className={`w-full bg-red-00 py-1 md:p-4  items-center justify-center text-md text-white ${
        isPlaying ? " sticky top-0 opacity-60   " : ""
      } ${ispro ? " flex" : "hidden"}`}
    >
      <audio ref={audioRef} src={audioLink} />

      <div className="flex items-center  justify-between gap-4 py-2 px-6 rounded-full  bg-primary-500 w-fit">
        <p>Listen article</p>
        <button className="" onClick={startOver}>
          <RestartAltIcon className={'text-2xl'}/>
        </button>
        <button className=" font-bold  rounded flex items-center" onClick={togglePlayPause}>
          {isPlaying ? (
            <PauseCircleIcon className={'text-[2.5rem]'} />
          ) : (
            <PlayCircleIcon className={'text-[2.5rem]'} />
          )}
        </button>

        <div className="flex items-center">
          <select
            className="bg-primary-500 outline-none border-none  py-1 rounded  appearance-none"
            value={playbackSpeed}
            onChange={(e) =>
              handlePlaybackSpeedChange(parseFloat(e.target.value))
            }
          >
            <option className="" value={0.5}>
              0.5x
            </option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { SearchIcon } from "../../utils/icons";
import { Modal } from "../UIComponents";
import { SearchComponent } from "./SearchComponent";

export const SearchContainer = () => {
  const [open, setopen] = useState(false);
  const handleToggle=()=>{
    setopen(!open)
  }
  return (
    <>
      <button className="rounded-full p-2 bg-background-100 flex hover:bg-background-200  duration-200" onClick={handleToggle}>
        <SearchIcon />
      </button>
      <Modal open={open} setOpen={setopen} direction={"items-start justify-center"}>
        <div className="bg-backgro und-50     flex-col items-start pt-10 w-[100vw] xl:w-[50vw]"><SearchComponent setOpen={setopen}/></div>
        
      </Modal>
    </>
  );
};

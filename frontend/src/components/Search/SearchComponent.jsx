import React, { useEffect, useRef, useState } from "react";
import { DropDown } from "../UIComponents/DropDown";
import { CloseIcon, SearchIcon } from "../../utils/icons";
import { useLazySearchQuery } from "../../slices/affairSlice";
import { useDebounce } from "../../hooks";
import { SuggestionCard } from "./SuggestionCard";
import { useNavigate } from "react-router-dom";

export const SearchComponent = ({setOpen}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchItem, setsearchItem] = useState("");
  const debouncedSearch = useDebounce(searchItem, 200);
  const [search] = useLazySearchQuery();
  const [results, setresults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, seterror] = useState("");
    const navigate=useNavigate()
  useEffect(() => {
    const startSearch = async () => {
      setisLoading(true);
      try {
        const { data, error } = await search(debouncedSearch);
        setIsOpen(true)
        setisLoading(false);
        if (data) {
          setresults(data);
        } else if (error) {
            setresults([])
            seterror(error?.data?.message)
        }
      } catch (error) {
        setresults([])
        seterror("Error occured, try gain later");
      }
    };
    if(searchItem)
    startSearch();
  }, [debouncedSearch]);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
const handleSubmit=(event)=>{
    event.preventDefault(); // Prevent form submission from refreshing the page
    setIsOpen(false)
    try {
      setOpen(false)
    } catch (error) {
      null;
    }
    if(searchItem)
    navigate(`search-results/${searchItem}`)
  setsearchItem('')
}

  return (
    <form className="block  w-full px-5 self-start relative " onSubmit={handleSubmit} >
      <div className="flex flex-col items-center outline-none border rounded-full bg-background-50 border-background-200 duration-200 
      focus:border-background-950 relative focus-within:border-background-300 p-1 w-full ">
        <div className="flex items-center w-full gap-4">
        <SearchIcon className={" pl-4"} />
        <input
          type="text"
          className="p-2 bg-full w-full bg-background-50 border-none outline-none rounded-full"
          placeholder="Search Articles..."
          value={searchItem}
          onChange={(e) => setsearchItem(e.target.value)}
        />
        {searchItem?<button className="flex rounded-full hover:bg-background-100 p-1" onClick={()=>setsearchItem('')}><CloseIcon/></button>:null}
        <button onClick={handleSubmit} className="bg-background-100  px-4 py-2 rounded-full hover:bg-background-200 duration-200">Search</button>
        </div>



         <div className="  " ref={dropdownRef}>
      {/* {isOpen ? (
        <div
          className={`fixed top-[75px] left-0 w-full h-full  bg-black/5  justify-center   ${
            isOpen ? "opacity-100" : "opacity-0"
          } ${isOpen ? "visible" : "invisible"} backdrop-blur-sm `}
          onClick={() => setIsOpen(false)}
        >
        </div>
      ) : null} */}
      <div
        className={`${
          isOpen ? "absolute" : "hidden" 
        } z-[1000] shadow-md mt-2 left-0 lg:left-0 w-full  overflow-hidden   bg-background-1000 border border-background-100 rounded-lg `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {results.length > 0 ? 
          <div className="flex flex-col gap-2  w-full p-2 ">
            {results.map((item, index) => (
              <SuggestionCard item={item} key={index} setIsOpen={setIsOpen} setsearchItem={setsearchItem}/>
            ))}
          </div>
         :<p className="p-3">{isLoading?"Searching...":'' ||errorMsg}</p> }
        
      </div>
    </div>

</div>
    </form>
  );
};

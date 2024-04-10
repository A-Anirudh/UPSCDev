import React, { useEffect, useState } from "react";
import { DropDown } from "../Common/DropDown";
import { SearchIcon } from "../../utils/icons";
import { useLazySearchQuery } from "../../slices/affairSlice";
import { useDebounce } from "../../hooks";
import { SuggestionCard } from "./SuggestionCard";
import { useNavigate } from "react-router-dom";

export const SearchComponent = () => {
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

//   useEffect(() => {
// console.log('Results',results)
//   }, [results])
  
const handleSubmit=(event)=>{
    event.preventDefault(); // Prevent form submission from refreshing the page
    setIsOpen(false)
    if(searchItem)
    navigate(`search-results/${searchItem}`)
}

  return (
    <form className="hidden md:block  w-1/2 px-5 self-end relative" onSubmit={handleSubmit} >
      <div className="flex items-center outline-none border rounded-lg border-background-200 duration-200 focus:border-background-950 relative focus-within:border-background-300 p-1">
        <SearchIcon className={" pl-4"} />
        <input
          type="text"
          className="p-2 bg-full w-full bg-background-50 border-none outline-none rounded-lg"
          placeholder="Search Articles..."
          onChange={(e) => setsearchItem(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-background-100  px-4 py-2 rounded-md hover:bg-background-200 duration-200">Search</button>
      </div>
      <DropDown isOpen={isOpen} setIsOpen={setIsOpen}>
        {results.length > 0 ? 
          <div className="flex flex-col gap-2 bg-red-900">
            {results.map((item, index) => (
                <SuggestionCard item={item} key={index} setIsOpen={setIsOpen} setsearchItem={setsearchItem}/>
            ))}
          </div>
         :<p className="p-3">{isLoading?"Searching...":'' ||errorMsg}</p> }

      </DropDown>
    </form>
  );
};

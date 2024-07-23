import React, { useRef, useState, useEffect } from 'react';
import { AffairCardNew } from '../Affair Components/AffairCardNew';
import { LeftIcon, RightIcon } from '../../utils/icons';


export const CategoryCardsContainer = ({  cards }) => {
//   console.log(cards)
const sliderRef = useRef(null);
const [visible, setvisible] = useState(false)
const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200; // You can adjust the scroll amount as needed
    }
  };
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 200; // You can adjust the scroll amount as needed
    }
  };

  const [language, setLanguage] = useState()

  useEffect(() => {
    const languageFromLocalStorage = JSON.parse(localStorage.getItem('language'));
    console.log('language fetched from localstorage is',languageFromLocalStorage)
    setLanguage(languageFromLocalStorage)
  }, [language])

    return (
<div className=" flex flex-col   relative  w-full ">
      <section className='flex gap-2  overflow-x-auto overflow-y-hidden snap-x w-full scroll-smooth sidebar ' ref={sliderRef}             onMouseEnter={()=>setvisible(true)}
            onMouseLeave={()=>setvisible(false)}>
        {
          cards?.map((item, idx) => {
            const { _id, pid, affairName, tags, thumbnail } = item;
            return (  // Check if myFavs is truthy
              <AffairCardNew
                key={_id}
                _id={_id}
                idx={idx}
                pid={pid}
                affairName={affairName}
                tags={tags}
                thumbnail={thumbnail}
                language = {language}
              />
            )
          })
        }
          <button 
            className={`px-2 bg-black bg-opacity-30 rounded-l-md ${visible?"flex":'invisible'} flex  absolute -left-3  md:-left-2 bottom-[1%]    shadow-md h-full items-center z-[9999] `}
            onClick={scrollLeft}

          >
            <LeftIcon  />
          </button>
      
          <button 
            className={`px-2  bg-black bg-opacity-30 rounded-l-md  ${visible?"flex":'invisible'} absolute -right-3 md:-right-2  bottom-[1%] backdrop-blur-md backdrop-opacity-55 h-full items-center 
            z-[9999]`}
            onClick={scrollRight}

          >
            <RightIcon />
          </button>


      </section>
</div>
  )
}
// myFavs, idx, handleFav, isFavourite 
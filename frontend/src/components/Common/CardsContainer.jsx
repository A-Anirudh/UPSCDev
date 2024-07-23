import React, { useState } from "react";
import { Card } from "./Card";
import { AffairCardNew } from "../Affair Components/AffairCardNew";
import { useEffect } from "react";

export const CardsContainer = ({ data }) => {
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    const languageFromLocalStorage = JSON.parse(localStorage.getItem('language'));
    setLanguage(languageFromLocalStorage)  
  }, [language])



  return (
    <section
      className={`grid  py-5 
    grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-7
    
  `}
    >
      {
        data?.map((item,idx)=>{
            const { _id, pid, affairName, tags, thumbnail } = item;

            return(
                <Card
                key={idx}
                _id={_id}
                pid={pid}
                affairName={affairName}
                tags={tags}
                thumbnail={thumbnail}
                language={language}
                />
            )
        })
      }
    </section>
  );
};

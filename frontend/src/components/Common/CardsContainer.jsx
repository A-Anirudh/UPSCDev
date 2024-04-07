import React from "react";
import { Card } from "./Card";
import { AffairCardNew } from "../Affair Components/AffairCardNew";

export const CardsContainer = ({ data }) => {




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
                />
            )
        })
      }
    </section>
  );
};

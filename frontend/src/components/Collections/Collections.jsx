import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { LibraryCard } from "./LibraryCard";
import { CollectionCardContainer } from "./CollectionCardContainer";
import { useGetAllCollectionsQuery } from "../../slices/CollectionSlice";
import { useTranslation } from "react-i18next";

export const Collections = ({language}) => {
  const { data, error, isLoading,refetch } = useGetAllCollectionsQuery();
  const [collectionData, setcollectionData] = useState([]);
  const [t,i18n] = useTranslation("global");

  useEffect(() => {
    if (data) {
      // console.log("collection adta in collection",data?.data);
      setcollectionData(data?.data);
    }
  }, [data,collectionData]);

  




  if(!data){
    return <h1 className="md:px-10 px-4 text-gray-300">No collections</h1>
  }
  if (isLoading) {
    return "Loading";
  }
  if(error){
    console.log(error)
    if(error?.data?.message==='No playlist found!')
    return <h2 className="md:px-10 px-4 text-gray-300">No collections</h2>
    else
    return "error"
  }

  return (
    <div className="p-4 md:px-10 md:py-5 rounded my-2 text-text-25 w-full">
      <p className="md:text-3xl text-2xl font-semibold my-5 mb-10">
        {t('library.title')}
      </p>
      <p className={`${collectionData.length==0?"block":'hidden'}   text-gray-300`}>No collections yet</p>
      <div className="flex  flex-col w-full gap-5">
        {collectionData.map((item,idx) => (
          <CollectionCardContainer
            category={item?.playlistName}
            cards={item?.articles}
            key={idx}
            refetch={refetch}
            playlistId={item._id}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

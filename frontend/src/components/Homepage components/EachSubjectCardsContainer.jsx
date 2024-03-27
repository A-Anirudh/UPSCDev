import React, { useEffect, useMemo, useState } from "react";
import { useGetAllSubjectWiseQuery } from '../../slices/affairSlice'
import { CardsContainer } from '../Common/CardsContainer'
import { useAddFavMutation, useDeleteFavMutation, useGetAllFavQuery } from "../../slices/favouriteSlice";
import { toastSuccess } from "../../utils/myToast";
import toast from "react-hot-toast";

export const EachSubjectCardsContainer = ({subject,isCurrentAffair}) => {
  const {data,error,refetch,isLoading}=useGetAllSubjectWiseQuery({subject:subject,isCurrentAffair:isCurrentAffair})
  const [allData, setallData] = useState([])

  useEffect(() => {
    if(data){
      setallData(data.allDataPerSubject)
    }
  }, [data,isLoading])

  const [myFavs, setmyFavs] = useState();

  const favData = useGetAllFavQuery({}, { refetchOnMountOrArgChange: true });

  const [addFav] = useAddFavMutation();
  const [delFav] = useDeleteFavMutation();

  // Effect to update favorites and affairs data
  useEffect(() => {
    if (favData?.data?.data) {
      setmyFavs(favData.data.data);
      
    }
  }, [favData, myFavs]);


  

    // Helper function to check if an affair is a favorite
    const myFavsLookup = useMemo(() => {
      try {
        return myFavs.reduce((lookup, fav) => {
          lookup[fav.affairId] = true;
          return lookup;
        }, {});
      } catch (error) {}
    }, [myFavs, favData]);

    
  const isFavourite = (affairId) => {
    try {
      return !!myFavsLookup[affairId];
    } catch (error) {}
  };

  const handleFav = async (_id, isFavourite, affairName, setisFav) => {
    if (!isFavourite) {
      try {
        const { data, error } = await addFav({ affairId: _id });

        if (data?.pid) {
          toastSuccess("Added to favourites");
          setisFav(true);
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        await favData.refetch();
      }
    } else if (isFavourite) {
      const { pid } = myFavs.find((fav) => fav.affairId === _id);
      if (pid) {
        try {
          const { data, error, isLoading } = await delFav({ pid: pid });
          if (data) {
            toastSuccess("Removed to favourites");
            setisFav(false);
          }
        } catch (error) {
          toast.error("Failed to add");
        } finally {
          await favData.refetch();
        }
      }
    }
  };

  
  return (
    <div className='xl:w-3/4 h-full mx-auto'>
      <section className='p-4 md:px-10 md:py-3 rounded my-2 text-text-25 w-full'>
      <p className="md:text-3xl text-2xl font-semibold my-1 mb-10">
       {subject}
      </p>
        <CardsContainer data={allData} handleFav={handleFav} isFavourite={isFavourite} />
      </section>
    </div>
  )
}

import React, { useEffect, useState } from "react";
import { useAllMyRoomsQuery } from "../slices/roomSlice";
import { RoomDetailsCard } from "../components";
import { useTranslation } from "react-i18next";

export const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [success, setSuccess] = useState(false);
  const { data, error, refetch } = useAllMyRoomsQuery();
  const [t,i18n] = useTranslation("global");

  useEffect(() => {
    if (data) {
      setRooms(data.data);
      setSuccess(data.success);
    }
  }, [data]);

  return (
    <>
      <section className=" lg:w-3/4 2xl:w-1/2 mx-auto p-1 md:p-5">
        <p className="md:text-3xl text-2xl font-semibold my-5 pb-5 px-5 md:px-0">
          {t('meetings.meetings')}
        </p>
        <section className="flex flex-col justify-center gap-3">
          {success ? (
            rooms?.map((item, i) => (
              <div key={i}>
                <RoomDetailsCard
                  roomId={item?.roomId}
                  roomName={item?.roomName}
                  isActive={item?.isActive}
                  refetch={refetch}
                  t={t}
                />
              </div>
            ))
          ) : (
            <p>No rooms found!</p>
          )}
        </section>
      </section>
    </>
  );
};

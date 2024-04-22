import React, { useEffect, useState } from 'react'
import { useAllMyRoomsQuery } from '../slices/roomSlice'

export const MyRooms = () => {
    const [rooms, setRooms] = useState([])
    const [success, setSuccess] = useState(false)
    const { data, error, refetch } = useAllMyRoomsQuery()

    useEffect(() => {
        if (data) {
            setRooms(data.data)
            setSuccess(data.success)
        }

    }, [data])

    return (
        <>
            <div>My rooms</div>
            <br />
            <br />
            <div>
                {success ? rooms.map((room, i) => (
                    <div key={i}>
                        <ul  className='mx-10 border w-[250px]'>
                            <li>Room name: {room.roomName}</li>
                            <li>Room ID: {room.roomId}</li>
                        </ul>
                        <br />
                    </div>

                    
                    
                )) : <p>No rooms found!</p>}
            </div>
        </>
    );
}

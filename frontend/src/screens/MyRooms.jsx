import React, { useEffect, useState } from 'react'
import { useAllMyRoomsQuery,useEndRoomMutation } from '../slices/roomSlice'
import { toastSuccess } from '../utils/myToast'

export const MyRooms = () => {
    const [rooms, setRooms] = useState([])
    const [success, setSuccess] = useState(false)
    const { data, error, refetch } = useAllMyRoomsQuery()
    const [endMeeting] = useEndRoomMutation() 

    const handleEndMeeting = async (roomId) => {
        console.log(roomId)
        const resultData = await endMeeting({roomId})
        await refetch()

        if(resultData){
            console.log(resultData)
            toastSuccess('Meeting ended successfully!')
        } else{
            console.log('error')
        }
    }

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
                            {room.isActive ? <li><button onClick={() => handleEndMeeting(room.roomId)}>End meeting</button></li> : '' }
                            
                        </ul>
                    <br />
            </div>

                    
                    
                )) : <p>No rooms found!</p>}
            </div>
        </>
    );
}

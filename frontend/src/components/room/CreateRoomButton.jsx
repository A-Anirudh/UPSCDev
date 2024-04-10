;import React from 'react'
import { AddIcon } from '../../utils/icons'
import {useNavigate} from 'react-router-dom'
import { useCreateRoomMutation } from '../../slices/roomSlice'


// get request for create room!
// Backend will generate the code and redirect directly to that room meeting... url.com/asdf-asdf-ads

const CreateRoomButton = () => {

 const navigate = useNavigate()

  //  Make API call to createRoom with random number for roomID and navigate to $id

  const generateRandomString = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    
    // Generate random string of length 9
    for (let i = 0; i < 9; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Insert hyphens after every 3 characters
    const stringWithHyphens = randomString.replace(/(.{3})/g, '$1-');
    
    // Remove the trailing hyphen
    return stringWithHyphens.slice(0, -1);
  }


  const roomId = generateRandomString();


  const handleSubmit = () =>{
      console.log(roomId)
      // Check if already in room.. then don't allow creation of new room... else create new room
      // Time to make some API calls XD
      navigate(`/room/${roomId}`)
  }
    return (
      <>
      <button onClick={handleSubmit}className='flex items-center'> <AddIcon/> Create room</button>
      </>
    )
  }

export default CreateRoomButton
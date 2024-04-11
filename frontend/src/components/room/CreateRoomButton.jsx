
import { AddIcon } from '../../utils/icons'
import {useNavigate} from 'react-router-dom'


// get request for create room!
// Backend will generate the code and redirect directly to that room meeting... url.com/asdf-asdf-ads

const CreateRoomButton = () => {

 const navigate = useNavigate()

  const handleSubmit = () =>{
    console.log('abc')

      // navigate(`/room/${roomId}`)
  }
    return (
      <>
      <button onClick={handleSubmit}className='flex items-center'> <AddIcon/> Create room</button>
      </>
    )
  }

export default CreateRoomButton
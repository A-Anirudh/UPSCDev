import React, {useEffect,useMemo,useState} from 'react'
import {io} from 'socket.io-client'
import { useParams } from "react-router-dom";

export const Room = () => {
  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_SOCKET_URL, {
        withCredentials: true,
      }),
    []
  );

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const username = userInfo.data.username

  const { roomId } = useParams();
  const [room, setRoom] = useState(roomId);
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [socketID, setSocketID] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message',{message,room,username});
    setMessage("")
  }


  useEffect(() => {
    
    socket.emit("join-room", room, username);
    socket.emit('all-users',room)

    socket.on('connect', () => {
      console.log('connected',socket.id)
      setSocketID(socket.id)
    });

    socket.on("receive-message", (data) => {
      console.log(data)
      setMessages((messages) => [...messages,data])
    })

    socket.on('notify-everyone', (data) =>{
      console.log('notify everyone',data)
    })

    socket.on('reply-all-users', (message) => {
      console.log('the message is', message)
    })

    return () => {
      socket.disconnect();
    }

  }, [])

  return (
    <div>
      Room Id: {roomId}

      <br /><br />
        <div>
          <form onSubmit={handleSubmit}>
          <input type="text" name="message" id="message" value={message} onChange={e=>setMessage(e.target.value)} style={{ border: '1px solid red' }} />
          <button style={{ border: '1px solid green' }} type='submit'>SEND</button>
          </form>
        </div>

        {messages.map((m, i) => (
          <div key={i}>
            {m.username} :
            {m.message}
          </div>
        ))}
    </div>
  )
}
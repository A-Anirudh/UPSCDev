import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { meetingExists } from '../slices/quizOpenSlice';
import { Room } from '../screens';

export const Test = ({ onLeaveMeeting }) => {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { username: 'Alice', message: 'Hello there!' },
    { username: 'Bob', message: 'Hey, how are you?' },
    { username: 'Charlie', message: 'I\'m doing great, thanks!' },
    { username: 'Alice', message: 'Anyone else joining?' },
    { username: 'David', message: 'Yes, I\'m here!' }
  ]);
  const dispatch = useDispatch()

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // Add functionality to send message
    console.log('Sending message:', message);
    setMessage('');
  };

  const leaveMeeting = () => {
    // Add functionality to leave meeting
    localStorage.removeItem("meeting");
    console.log('Meeting left!!!')
    dispatch(meetingExists(false))
    onLeaveMeeting();
    console.log('Leaving meeting...');
  };

  return (
    <div className={`fixed bottom-0 right-0 ${expanded ? 'z-100000000' : 'z-50'} ${expanded ? 'h-full w-full' : 'h-16 w-32'} bg-white shadow-lg rounded-t-lg border border-gray-300 overflow-hidden transition-all duration-300 ease-in-out`}>
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
        <h3 className="text-lg font-semibold">Chat</h3>
        <button onClick={toggleExpand} className="focus:outline-none">
          {expanded ? (
            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.293 12.707a1 1 0 0 0 1.414 0L12 11.414l1.293 1.293a1 1 0 1 0 1.414-1.414l-3-3a1 1 0 0 0-1.414 0l-3 3a1 1 0 1 0 1.414 1.414L12 11.414l-2.293 2.293a1 1 0 0 0 0 1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"/>
            </svg>)}
        </button>
      </div>
      {expanded && <Room roomId={'qjj-kzn-yhr'}/>}
    </div>
  );
};
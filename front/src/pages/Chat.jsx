import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {current_user2} from '../components/user/containers/User.jsx'

 export const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState({});

  

  useEffect(()=>{
    const s = io({path: "/chat-socket/"});
    s.on('chat message', handleMessage );
    setSocket(s);
  },[]); 

  const handleMessage=(msg)=> {
    const item = <li key={msg}>{current_user2+': '+msg}</li>;
    setMessages(mess =>[...mess, item]);
    window.scrollTo(0, document.body.scrollHeight);
  }; 


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue) {
      socket.emit('chat message', inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <ul id="messages">
        {messages}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input id="input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} autocomplete="off" />
        <button>Send2</button>
      </form>
    </div>
  );
};


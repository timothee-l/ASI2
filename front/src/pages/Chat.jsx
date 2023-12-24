import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';


 export const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState({});
  let current_user = useSelector(state => state.userReducer.user);
  let user_name = (current_user && current_user.login) ? current_user.login : "guest";

  

  useEffect(()=>{
    const s = io({path: "/chat-socket/"});
    s.on('chat message', handleMessage );
    setSocket(s);
  },[]); 

  const handleMessage=(msg)=> {
    console.log(current_user);
    const item = <li key={msg}>{msg}</li>;
    setMessages(mess =>[...mess, item]);
    window.scrollTo(0, document.body.scrollHeight);
  }; 


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue) {
      socket.emit('chat message', user_name+': '+inputValue);
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
        <button>Send</button>
      </form>
    </div>
  );
};


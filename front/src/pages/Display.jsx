import React, { useState } from 'react';
import {useSelector } from "react-redux";
import {User } from '../components/user/containers/User.jsx';
import {set_user} from '../slices/userSlice.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';

//TODO Renommer login/moncompte mais pas display

export const Display =(props) =>{
  let current_user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    fetch('/mono/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Connexion échouée');
        }
        return response.json();
      })
      .then((data) => {
        fetchUserDetails(data);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  
  
  const handleLogout = () => {
    dispatch(set_user({}));
  };

  const fetchUserDetails = (id) => {
    fetch(`/mono/user/${id}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user details: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        dispatch(set_user(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  console.log("Current User:" + JSON.stringify(current_user));

  function notNullOrEmpty(obj) {
    if (obj === null){
      return false;
    }
    if (obj === undefined){
      return false;
    }
    if (Object.keys(obj).length === 0){
      return false;
    }
    return true;
  }

  return (
  
    <div>
      <div>
        <p>{errorMsg}</p>
      </div>
      {notNullOrEmpty(current_user) ? (
        <div>
          <Container>
            <User 
              id={current_user.id}
              surname={current_user.surName}
              lastname={current_user.lastName}
              login={current_user.login}
              pwd={current_user.pwd}
              money={current_user.account}
              img={current_user.img}
              display_type='FULL'/>      
          </Container>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};


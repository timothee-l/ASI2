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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if there is a valid cookie on page load
    fetch('/auth/user', { credentials: 'include' })
      .then((response) => response.json())
      .then(
        (data) => {setUserId(data.userId), fetchUserDetails(data.userId), console.log("good cookie")},
        (error) => {
          console.error(error);
          setUserId(null);
          dispatch(set_user({}));
          console.log("bad cookie");
        }
      );
  }, []);

  const handleLogin = () => {
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then((data) => {
        console.log('Login success', data);
        setUserId(data.userId);
        fetchUserDetails(data.userId);
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg('Connexion échouée');
      });
  };
  
  const handleLogout = () => {
    fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(() => {
        setUserId(null)
        dispatch(set_user({}));
      })
      .catch((error) => console.error(error));
  };

  const fetchUserDetails = (id) => {
    fetch(`/db/user/${id}`, {
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
  console.log("Current user id: " + userId);

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
  
  if(notNullOrEmpty(current_user)){
    fetchUserDetails();
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
              surname={current_user.surname}
              lastname={current_user.lastname}
              login={current_user.login}
              pwd={current_user.pwd}
              money={current_user.money}
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


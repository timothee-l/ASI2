import React, { useState } from 'react';
import  { Route, Router, useNavigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import '../sources/style.css';
import { useSelector } from 'react-redux';

export const Home =(props) =>{

  const navigate = useNavigate();
  let user = useSelector(state => state.userReducer.user);
  let isUserEmptyOrNull = !user || Object.keys(user).length === 0;

  const handleClick = () => {
    navigate(`/deck`);
  };

  return (
    <>
      <Container>
        <h1>HOME</h1>
        {isUserEmptyOrNull && (
          <div>
            <p>You need to be signed in to play.</p>
          </div>
        )}
        <button className="PlayButton" disabled={isUserEmptyOrNull} onClick={handleClick}>
          Find Game
        </button>
      </Container>
    </>
  );
}
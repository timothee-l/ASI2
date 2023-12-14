import React, { useState } from 'react';
import  { Route, Router, useNavigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import '../sources/style.css';

export const Home =(props) =>{

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/deck`);
  };

  return (
    <>
    <Container>
      <h1>HOME</h1>
      <button className="PlayButton" onClick={handleClick}> Find Game</button>
    </Container>
    </>
  );
}
import React, { useState } from 'react';
import { Checkbox, Container } from 'semantic-ui-react';
import  { Route, Router, useNavigate } from 'react-router-dom'
import '../../sources/style.css';
import P1Deck from '../../sources/P1Deck.json'
import { DeckListe } from '../../components/jeu/DeckListe'

export const SelecDeck =(props) =>{
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/room`);
    };

  return (
    
    <Container>
      <h3>Selectionne 5 cartes</h3>
      <DeckListe cards={P1Deck.cards} inliste />
      <button className="PlayButton" onClick={handleClick}> Find Game</button> {/* on peut utiliser la balise disabled pour s'assurer que 5 cartes sont cocher pour cliquer sur jouer*/} 
    </Container>
  );
}
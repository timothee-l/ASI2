import React, { useState } from 'react';
import { Checkbox, Container } from 'semantic-ui-react';
import  { Route, Router, useNavigate } from 'react-router-dom'
import '../../sources/style.css';
import P1Deck from '../../sources/P1Deck.json'
import { DeckListe } from '../../components/jeu/DeckListe'

export const SelecDeck =(props) =>{
  console.log(props);
  const navigate = useNavigate();

  const [validDeck, setvalidDeck] = useState(false);
  const [nbC, setNbC] = useState(0);


  const handleOnCheck = (value) =>{
    if (value){
      setNbC(nbC +1);
    }
    else{
      setNbC(nbC -1);
    }
  }

  const handleClick = () => {
      navigate(`/room`);
  };
  const handleTest = () => {
    console.log('Test Button clicked')
    setvalidDeck(!validDeck);
  }

  return (
    
    <Container>
      <h3>Selectionne 5 cartes</h3>
      {/*<button className='TestButton' onClick={handleTest}> Test </button> */}
      <button disabled={nbC != 5} className="PlayButton" onClick={handleClick}> Find Game</button> {/* on peut utiliser la balise disabled pour s'assurer que 5 cartes sont cocher pour cliquer sur jouer*/} 
      <div className='deck-show'>
        <DeckListe handleOnCheck={handleOnCheck} cards={P1Deck.cards} inliste />
      </div>
    </Container>
  );
}
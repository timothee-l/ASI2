import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { DeckListe } from '../../components/jeu/DeckListe';

export const SelecDeck = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const [userCards, setUserCards] = useState([]);
  const [validDeck, setValidDeck] = useState(false);
  const [buttonText, setButtonText] = useState("Find Game");
  const [deck, setDeck] = useState([]);

  const findGame = (user, deck) => {
    const socket = io({ path: "/socket-service/", transports: ["websocket"] });

    // Register the client with the server
    socket.emit('register-client', { user, deck });

    // Listen for the 'start' event
    socket.on('start', (data) => {
      navigate('/room', { state: { playerDeck: deck, opponent: data.user, opponentDeck: data.deck, gameId: data.gameId, activeTurn: data.activeTurn} });
    });
  };

  const handleOnCheck = (card) => {
    const cardIndex = deck.indexOf(card);

    if (cardIndex === -1) {
      // If not in the list, add it
      setDeck([...deck, card]);
    } else {
      // If in the list, remove it
      const updatedList = [...deck];
      updatedList.splice(cardIndex, 1);
      setDeck(updatedList);
    }
  };

  useEffect(() => {
    if (deck.length === 5) {
      setValidDeck(true);
    } else {
      setValidDeck(false);
    }
  }, [deck]);

  const handleClick = () => {
    if (validDeck) {
      setButtonText("Waiting for opponent");
      setValidDeck(false);
      findGame(user, deck);
    }
  };

  const fetchUserCard = async (card_id) => {
    try {
      const response = await fetch(`http://localhost:5100/mono/card/${card_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user cards');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user cards:', error.message);
      return null;
    }
  };

  const fetchData = async () => {
    setUserCards([]);

    const cardPromises = user.cardList.map(async (id) => {
      console.log("fetching " + id);
      return fetchUserCard(id);
    });

    const cardsData = await Promise.all(cardPromises);

    // Filter out null values (failed fetches) before updating the state
    const filteredCardsData = cardsData.filter((data) => data !== null);
    setUserCards(filteredCardsData);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <Container>
      <h3>Select 5 cards</h3>
      <button
        disabled={!validDeck}
        className="PlayButton"
        onClick={handleClick}
      >
        {buttonText}
      </button>
      <div className='deck-show'>
        <DeckListe handleOnCheck={handleOnCheck} cards={userCards} inliste />
      </div>
    </Container>
  );
};

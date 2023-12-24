import React, { useState } from 'react';

import { Liste } from '../../components/jeu/Liste';
import { Container } from 'semantic-ui-react';
import '../../sources/style.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from 'socket.io-client';

export const Jeu =(props) =>{

    const [HP, setHP] = useState(4); //On set les HP a 4 pour test le retour au menu principal
    const user = useSelector((state) => state.userReducer.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [opponent, setOpponent] = useState(location.state.opponent);
    const [playerDeck, setPlayerDeck] = useState(location.state.playerDeck);
    const [gameId, setGameId] = useState(location.state.gameId);
    const [opponentDeck, setOpponentDeck] = useState(location.state.opponentDeck);
    const [activeTurn, setActiveTurn] = useState(false);
    const [selectedPlayerCard, setSelectedPlayerCard] = useState();
    const [selectedOpponentCard, setSelectedOpponentCard] = useState();
    const [gameStatus, setGameStatus] = useState("Début partie");

    const socket = io({ path: "/socket-game/" });

    useEffect(() => {
        if(activeTurn){
            setGameStatus("Votre tour: Choisissez deux cartes");
        }else{
            setGameStatus("Tour adverse...");
        }
    }, [activeTurn]);

    useEffect(() => {
        socket.connect({ gameId, user, playerDeck });
        if (socket) {
            console.log("Joining " + gameId + " user " + user);
            socket.emit('joinGame', { gameId, user, playerDeck });
        }
    
        // Listen for updates from the socket
        socket.on('updateDecks', ({ playerDeck: updatedPlayerDeck, opponentDeck: updatedOpponentDeck, activeTurn: updatedTurn }) => {
            setPlayerDeck(updatedPlayerDeck);
            setOpponentDeck(updatedOpponentDeck);
            setActiveTurn(updatedTurn);
        });

        socket.on('gameOver', ({winner: winner}) => {
            if(winner){
                setGameStatus("Victoire!");
            }else{
                setGameStatus("Défaite");
            }
        });

        socket.on('start', ({activeTurn: updatedTurn}) => {
            console.log("GAME STARTING");
            setActiveTurn(updatedTurn);
        });
    
        // Clean up the socket connection when the component unmounts
        return () => {
          socket.disconnect();
        };
    }, [gameId, user, socket]);

    const endTurn = () => {
        if(activeTurn && selectedOpponentCard && selectedPlayerCard){
            console.log("Sending cards: " +JSON.stringify(selectedPlayerCard));
            socket.emit('sendCards', {
                selectedPlayerCard,
                selectedOpponentCard,
                user,
                gameId
            });
        }
    }

    const handleSelectPlayer = (card) => {
        setSelectedPlayerCard(card);
    }
    const handleSelectOpponent = (card) => {
        setSelectedOpponentCard(card);
    }


    return (
        <Container>
            <h3>Zone de Jeu</h3>
            <h3>{gameStatus}</h3>
            <button onClick={endTurn}> Attack </button>
            <div className="game-board">
                <p>{user.login}</p>
                <div className='player-one-cards'>
                    <div>
                        <Liste className="player-one-card-slot" handleSelectPlayer={setSelectedPlayerCard} cards={playerDeck} ingame/>
                    </div>
                </div>

                <div className='player-two-cards'>
                    <p>{opponent.login}</p>
                    <div>
                        <Liste className="player-two-card-slot" handleSelectOpponent={setSelectedOpponentCard} cards={opponentDeck} ingame/>
                    </div>
                </div>
            </div>
        </Container>
    );
}
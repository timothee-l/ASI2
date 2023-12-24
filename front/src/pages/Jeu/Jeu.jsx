import React, { useState } from 'react';
import market from "../../sources/market.json"
import P1Deck from "../../sources/P1Deck.json"
import { Liste } from '../../components/jeu/Liste';
import { Container } from 'semantic-ui-react';
import '../../sources/style.css';
import { useNavigate } from 'react-router-dom';

export const Jeu =(props) =>{

    const [HP, setHP] = useState(4); //On set les HP a 4 pour test le retour au menu principal
    const [Victory, setVictory] = useState(false)
    const navigate = useNavigate();

    function Attack(){
        //console.log('Attacker : %s , Defender : %s', props.AttackCard.Name , props.DefenderCard.Name)
        console.log('Attacked');
        setHP(HP - 1);
        console.log('HP left : %s', HP);
        if (HP === 0){
            setVictory(true);
        }
    }
    function EndTurn(){
        console.log('ended turn');
    }

    function ReturnHome(){
        navigate(`/`);
    }

    if (Victory){
        console.log('congratz you won');
        ReturnHome();
    }
    return (
        <Container>
            <h3>Zone de Jeu</h3>
            <button onClick={Attack}> Launch attack </button>
            <div className="game-board">
                <div className='player-one-cards'>
                    <div>
                        <Liste className="player-one-card-slot" cards={market.cards} ingame/>
                    </div>
                </div>

                <div className='player-two-cards'>
                    <div>
                        <Liste className="player-two-card-slot" cards={market.cards} ingame/>
                    </div>
                </div>
            </div>
            <button onClick={EndTurn}> End Turn </button>
        </Container>
    );
}
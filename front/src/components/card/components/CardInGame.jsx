import React from 'react';
import { useState } from 'react';
import '../../../sources/style.css';
import { Card, Container } from 'semantic-ui-react';

export const CardInGame = (props) => {

    const [CardInGame, setCardInGame] = useState(null);

    const handleActivate = (id) => {
        CardInGame === id 
        ? setCardInGame(null)
        : setCardInGame(id)
        console.log(props.card) // TODO send the card to the backend
    };
    
    return(
        <div className={`card-slot`}
            style={{
                backgroundColor: CardInGame === props.card.id ? "green" : null
            }}
        onClick={() => handleActivate(props.card.id)}>
            <div className='card-ingame'>
                <img style={{ height: 150, width: 150, objectFit: 'contain' }} src={props.card.src} alt="Card Image" />
                <div className='InfoBox'>
                    <div>
                    <div className='CardName'>{props.card.name}</div>
                        <div className="HP">HP: {props.card.hp}</div>
                        <div className="Energy">Energy: {props.card.energy}</div>
                        <div className='Attack'>Attack: {props.card.attack}</div>
                        <div className='Defense'>Defense: {props.card.defense}</div>
                    </div>
                </div>   
            </div> 
        </div>
    );
};
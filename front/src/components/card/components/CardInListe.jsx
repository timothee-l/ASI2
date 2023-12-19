import React from 'react';
import '../../../sources/style.css';

export const CardInListe = (props) => {
    return(
        <div>            
            <p>Nom: {props.card.name}</p>
            <img style={{ height: 50, width: 50, objectFit: 'contain' }} src={props.card.src} alt="Card Image" />
            <div className="Stat-box">
                <div className="HP">HP: {props.card.hp}</div>
                <div className="Energy">Energy: {props.card.energy}</div>
                <div className='Attack'>Attack: {props.card.attack}</div>
                <div className='Defense'>Defense: {props.card.defense}</div>
            </div>
        </div>
    )
}
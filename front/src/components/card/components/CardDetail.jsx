import React from 'react';
import '../../../sources/style.css';

export const CardDetail = (props) => {
    return(
        <div>            
            <p>Nom: {props.card.name}</p>
            <p>Valeur: {props.card.value}</p>
            <img style={{ height: 500, width: 500, objectFit: 'contain' }} src={props.card.imgUrl} alt="Card Image" />
            <div className="Stat-box">
                <div className="HP">HP: {props.card.hp}</div>
                <div className="Energy">Energy: {props.card.energy}</div>
                <div className='Attack'>Attack: {props.card.attack}</div>
                <div className='Defense'>Defense: {props.card.defence}</div>
            </div>
        </div>
    )
}
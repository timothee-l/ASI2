import React from 'react';
import '../../../sources/style.css';

export const CardDetail = (props) => {
    return(
        <div>            
            <p>Nom: {props.card.name}</p>
            <p>Valeur: {props.card.value}</p>
            <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={props.card.src} alt="Card Image" />
            <p>HP: {props.card.hp}</p>
        </div>
    )
}
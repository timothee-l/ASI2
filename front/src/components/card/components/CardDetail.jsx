import React from 'react';
import '../../../sources/style.css';

export const CardDetail = (props) => {
    return(
        <table>            
            <p>Nom: {props.card.name}</p>
            <p>Valeur: {props.card.value}</p>
            <img style={{ height: 500, width: 500, objectFit: 'contain' }} src={props.card.src} alt="Card Image" />
            <div class="Stat-box">
                <div class="HP">HP: {props.card.hp}</div>
                <div class="Energy">Energy: {props.card.energy}</div>
                <div class='Attack'>Attack: {props.card.attack}</div>
                <div class='Defense'>Defense: {props.card.defense}</div>
            </div>
        </table>
    )
}
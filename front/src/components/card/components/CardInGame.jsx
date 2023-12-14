import React from 'react';
import '../../../sources/style.css';
import { Container } from 'semantic-ui-react';

export const CardInGame = (props) => {
    return(
        <div className='card-slot'>
            <img style={{ height: 150, width: 150, objectFit: 'contain' }} src={props.card.src} alt="Card Image" />
            <table className='InfoBox'>
                <tr>
                    <td className='CardName'>{props.card.name}</td>
                </tr>  
                <tr>
                    <td className="HP">HP: {props.card.hp}</td>
                    <td className="Energy">Energy: {props.card.energy}</td>
                </tr>
                <tr>
                    <td className='Attack'>Attack: {props.card.attack}</td>
                    <td className='Defense'>Defense: {props.card.defense}</td>
                </tr>
            </table>    
        </div>
    )
}
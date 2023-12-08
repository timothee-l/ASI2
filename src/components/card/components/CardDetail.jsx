import React from 'react';
import '../../../sources/style.css';

export const CardDetail = (props) => {
    return(
        <div>            
            <p>{props.card.name}</p>
            <p>{props.card.value}</p>
            <img src={props.card.src}></img>
            <p>{props.card.hp}</p>
        </div>
    )
}
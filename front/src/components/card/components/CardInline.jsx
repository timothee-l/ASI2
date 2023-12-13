import React from 'react';
import '../../../sources/style.css';

export const CardInline = (props) => {
    return(
        <div>
            <p class="pe-3">Name : {props.card.name}</p>
            <p class="pe-3">Value : {props.card.value}</p>
        </div>
    )
}
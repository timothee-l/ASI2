import React from 'react';
import '../../../sources/style.css';

export const CardInline = (props) => {
    return(
        <div>
            <p class="pe-3">{props.card.name}</p>
            <p class="pe-3">{props.card.value}</p>
        </div>
    )
}
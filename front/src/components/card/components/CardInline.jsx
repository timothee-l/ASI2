import React from 'react';
import '../../../sources/style.css';

export const CardInline = (props) => {
    return(
        <div>
            <p className="pe-3">Name : {props.card.name}</p>
            <p className="pe-3">Value : {props.card.value}</p>
        </div>
    )
}
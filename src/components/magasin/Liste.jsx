import React from 'react';
import {Card} from '../../components/card/containers/Card.jsx';
import '../../sources/style.css';


export const Liste = (props) => {
    let display = props.cards.map(
        (card) => (
            <li key={card.name} class="list-group-item">
                <Card card={card} inline />
            </li>
        )

    )

    return(
        <div>
            <ul class="list-group">
            {display}
            </ul>
        </div>
    )

}
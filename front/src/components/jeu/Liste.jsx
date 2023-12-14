import React from 'react';
import {Card} from '../../components/card/containers/Card.jsx';
import '../../sources/style.css';


export const Liste = (props) => {
    let display = props.cards.map(
        (card) => (
            <li key={card.name} className="list-group-item">
                <Card card={card} ingame />
            </li>
        )

    )

    return(
        <div>
            <ul className="list-group">
            {display}
            </ul>
        </div>
    )

}
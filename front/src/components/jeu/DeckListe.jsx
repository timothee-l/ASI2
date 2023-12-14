import React from 'react';
import {Card} from '../../components/card/containers/Card.jsx';
import '../../sources/style.css';


export const DeckListe = (props) => {
    let display = props.cards.map(
        (card) => (
            <li key={card.name} className="list-group-item">
                <Card card={card} inliste/>
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
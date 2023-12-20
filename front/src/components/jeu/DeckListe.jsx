import React from 'react';
import {Card} from '../../components/card/containers/Card.jsx';
import '../../sources/style.css';


export const DeckListe = (props) => {
    let display = props.cards.map(
        (card) => (
            <li key={card.name} className="deck-card">
                <Card card={card} handleOnCheck={props.handleOnCheck} inliste/>
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
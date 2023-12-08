import React from 'react';
import {Card} from '../card/containers/Card';
import { useSelector } from 'react-redux';
import '../../sources/style.css';

export const Details = (props) => {

    let card = useSelector(state => state.cardReducer.current_card);



    return (

        <div>
            <h5>Details</h5>
            <Card card={card}/>
        </div>
    )
} 
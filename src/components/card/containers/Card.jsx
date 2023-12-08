import React from 'react';
import {CardInline} from '../components/CardInline';
import {CardDetail} from '../components/CardDetail';
import {useDispatch} from 'react-redux';
import { update_selected_card } from '../../../slices/cardSlice';
import '../../../sources/style.css';

export const Card = (props) => {
    if(props.card == undefined) {
        return (
            <div>
                <h5>No Data</h5>
            </div>
        )
    }

    const dispatch = useDispatch();

    function handleOnSelectedCard(card){
        dispatch(update_selected_card(card));
    }

    if(props.inline){
        return(
            <div class="d-flex">
                <CardInline card = {props.card}/>
                <button class="btn btn-primary" onClick={()=>{handleOnSelectedCard(props.card)}}>Details</button>
            </div>
        )
    }else{
        return(
            <div>
                <CardDetail card = {props.card}/>
                <button>Placeholder Tx</button>
            </div>
        )
    }
}
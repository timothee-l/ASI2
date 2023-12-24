import React from 'react';
import {CardInline} from '../components/CardInline';
import {CardDetail} from '../components/CardDetail';
import {CardInListe} from '../components/CardInListe';
import {CardInGame} from '../components/CardInGame';
import {useDispatch} from 'react-redux';
import { update_selected_card } from '../../../slices/cardSlice';
import '../../../sources/style.css';
import { Checkbox } from 'semantic-ui-react';

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

    
    function handleOnCheck(e){
        console.log(e.target)
        const value = e.target.checked;
        console.log(value);
        props.handleOnCheck(value);
    }

    if(props.inline){
        return(
            <div className="d-flex">
                <CardInline card = {props.card}/>
                <button className="btn btn-primary" onClick={()=>{handleOnSelectedCard(props.card)}}>Details</button>
            </div>
        )
    }
    if(props.ingame){
        return(
            <div className='d-flex'>
                <CardInGame card = {props.card}/>
            </div>
        )
    }
    if(props.inliste){
        return(
            <div className='d-flex'>
                <CardInListe card = {props.card} />
                <input type="checkbox" className='deck-checkbox' onClick={event => handleOnCheck(event)}/>
            </div>
        )
    }
    else{
        return(
            <div>
                <CardDetail card = {props.card}/>
            </div>
        )
    }
}
import React from 'react';
import {UserSimpleDisplay} from '../components/UserSimpleDisplay';
import {UserShortDisplay} from '../components/UserShortDisplay';
import { useDispatch, useSelector } from "react-redux";



const FULL_LABEL='FULL';
const SHORT_LABEL='SHORT';


 export const User=(props)=> {
    let current_user = useSelector(state => state.userReducer.user);


    let display="";
    switch(props.display_type){
        case SHORT_LABEL:
            display = (                
                <UserShortDisplay 
                    surname = {props.surname}
                    lastname = {props.lastname}
                    img = {props.img}
                    money = {props.money}> 
                </UserShortDisplay>
            );

            break;
        case FULL_LABEL:
            display=(                
                <UserSimpleDisplay 
                    id = {props.id}
                    surname = {props.surname}
                    lastname = {props.lastname}
                    login = {props.login}
                    pwd = {props.pwd}
                    money = {props.money}
                    img = {props.img}> 
                </UserSimpleDisplay>
            );
            break;
        default:
            display=(<h4>No Display Available</h4>);
    }
        return display;
    }
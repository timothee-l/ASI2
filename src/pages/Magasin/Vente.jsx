import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import user_cards from "../../sources/user_cards.json";
import { Liste } from '../../components/magasin/Liste';
import { Details } from '../../components/magasin/Details';
import { useDispatch } from 'react-redux';
import { update_selected_card } from '../../slices/cardSlice';
import '../../sources/style.css';


export const Vente =(props) =>{

    const dispatch = useDispatch();
    dispatch(update_selected_card({}));
  return (
    <Container>
        <div className="Vente" >
            <div>
                    <h1>Vente</h1>
            </div>
            <div class="container">

                <div class="div-left">
                    <Liste cards={user_cards.cards}/>
                </div>
                <div class="div-right">
                    <div class="card">
                        <div class="card-body">
                            <Details/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
  );
}
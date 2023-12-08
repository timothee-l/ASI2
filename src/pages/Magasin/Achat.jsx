import React, { useState } from 'react';
import { Container } from 'semantic-ui-react'
import market from "../../sources/market.json"
import { Liste } from '../../components/magasin/Liste';
import { Details } from '../../components/magasin/Details';
import { useDispatch } from 'react-redux';
import { update_selected_card } from '../../slices/cardSlice';
import '../../sources/style.css';



export const Achat =(props) =>{

    const dispatch = useDispatch();
    dispatch(update_selected_card({}));

  return (
    <Container>
        <div className="Achat" >
            <div>
                    <h1>Achat</h1>
            </div>
            <div class="container">

                <div class="div-left">
                    <Liste cards={market.cards}/>
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
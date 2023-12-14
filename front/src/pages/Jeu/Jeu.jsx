import React, { useState } from 'react';
import market from "../../sources/market.json"
import P1Deck from "../../sources/P1Deck.json"
import { Liste } from '../../components/jeu/Liste';
import { Container } from 'semantic-ui-react';
import '../../sources/style.css';

export const Jeu =(props) =>{

    return (
        <Container>
            <h3>Zone de Jeu</h3>
            <div className="game-board">
                <div className='player-one-cards'>
                    <div>
                        <Liste className="player-one-card-slot" cards={P1Deck.cards} ingame/>
                    </div>
                </div>

                <div className='player-two-cards'>
                    <div>
                        <Liste className="player-two-card-slot" cards={market.cards} ingame/>
                    </div>
                </div>
            </div>
        </Container>
    );
}
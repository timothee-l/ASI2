import React, { useState } from 'react';
import { Container } from 'semantic-ui-react'
import { Liste } from '../../components/magasin/Liste';
import { Details } from '../../components/magasin/Details';
import { useDispatch } from 'react-redux';
import { update_selected_card } from '../../slices/cardSlice';
import { useEffect } from 'react';
import '../../sources/style.css';
import { useSelector } from 'react-redux';



export const Achat =(props) =>{

    const dispatch = useDispatch();
    //dispatch(update_selected_card({}));

    const [cardsForSale, setCardsForSale] = useState([]);

    let user = useSelector(state => state.userReducer.user);
    let card = useSelector(state => state.cardReducer.current_card);
    
    if(!user){
        return(<div>Vous devez être connecté</div>);
    }
    if(Object.keys(user).length === 0){
        return(<div>Vous devez être connecté</div>);
    }

    useEffect(() => {
      dispatch(update_selected_card({}));
      const fetchCardsForSale = async () => {
        try {
          const response = await fetch('http://localhost:5100/db/cards/for-sale');
          if (!response.ok) {
            throw new Error('Failed to fetch cards for sale');
          }
  
          const data = await response.json();
          setCardsForSale(data);
        } catch (error) {
          console.error('Error fetching cards for sale:', error.message);
        }
      };
  
      fetchCardsForSale();
    }, []);

    return (
    <Container>
        <div className="Achat" >
            <div>
                    <h1>Achat</h1>
            </div>
            <div class="container">

                <div class="div-left">
                    <Liste cards={cardsForSale}/>
                </div>
                <div class="div-right">
                    <div class="card">
                        <div class="card-body">
                            <Details/>
                        </div>
                        <button>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    </Container>
    );
}
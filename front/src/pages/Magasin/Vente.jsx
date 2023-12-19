import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Liste } from '../../components/magasin/Liste';
import { Details } from '../../components/magasin/Details';
import { useDispatch } from 'react-redux';
import { update_selected_card } from '../../slices/cardSlice';
import { useEffect } from 'react';
import '../../sources/style.css';


export const Vente =(props) =>{

    const dispatch = useDispatch();

    const [userCards, setUserCards] = useState([]);

    dispatch(update_selected_card({}));

    let userId = 0; //TODO (placeholder) Get from auth
    
    useEffect(() => {
        const fetchUserCards = async () => {
          try {
            const response = await fetch(`http://localhost:5100/db/user/${userId}/cards`);
            if (!response.ok) {
              throw new Error('Failed to fetch user cards');
            }
    
            const data = await response.json();
            setUserCards(data);
          } catch (error) {
            console.error('Error fetching user cards:', error.message);
          }
        };
        fetchUserCards();
    }, [userId]);
    


    return (
    <Container>
        <div className="Vente" >
            <div>
                    <h1>Vente</h1>
            </div>
            <div class="container">

                <div class="div-left">
                    <Liste cards={userCards}/>
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
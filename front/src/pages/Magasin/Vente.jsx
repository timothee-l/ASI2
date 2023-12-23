import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Liste } from '../../components/magasin/Liste';
import { Details } from '../../components/magasin/Details';
import { useDispatch } from 'react-redux';
import { update_selected_card } from '../../slices/cardSlice';
import { useEffect } from 'react';
import '../../sources/style.css';
import { useSelector } from 'react-redux';


export const Vente =(props) =>{

    const dispatch = useDispatch();

    const [userCards, setUserCards] = useState([]);


    let userId = 1; //TODO (placeholder) Get from auth

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

        const fetchUserCards = async () => {
          try {
            const response = await fetch(`http://localhost:5100/db/user/${userId}/cards`); // --> replace by user.id
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
    
    const UnlistButton = () => {
        return <button>Unlist</button>;
      };
      
    const ListButton = () => {
        return <button>List</button>;
    };

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
                    {card?.for_sale ? <UnlistButton /> : <ListButton />}
                </div>
            </div>
        </div>
    </Container>
    );
}
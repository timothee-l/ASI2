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

    let user = useSelector(state => state.userReducer.user);
    let card = useSelector(state => state.cardReducer.current_card);
    
    if(!user){
        return(<div>Vous devez être connecté</div>);
    }
    if(Object.keys(user).length === 0){
        return(<div>Vous devez être connecté</div>);
    }

    const fetchUserCard = async (card_id) => {
        try {
            const response = await fetch(`http://localhost:5100/mono/card/${card_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user cards');
            }
    
            const data = await response.json();
            console.log("fetched " + JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('Error fetching user cards:', error.message);
            return null;
        }
    };
    
    const fetchData = async () => {
        dispatch(update_selected_card({}));
        setUserCards([]);

        const cardPromises = user.cardList.map(async (id) => {
            console.log("fetching " + id);
            return fetchUserCard(id);
        });

        const cardsData = await Promise.all(cardPromises);

        // Filter out null values (failed fetches) before updating the state
        const filteredCardsData = cardsData.filter((data) => data !== null);
        setUserCards([...userCards, ...filteredCardsData]);
    };

    useEffect(() => {

    
        fetchData();
    }, [user]);

    const handleSellButtonClick = async () => {
        try {
            console.log("user: " + user.id + " card:" + card.id)
            const response = await fetch('http://localhost:5100/mono/store/sell', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    card_id: card.id,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to sell the card');
            }
    
            const result = await response.json();
            console.log('Card sold successfully:', result);
    
            fetchData();
        } catch (error) {
            console.error('Error selling the card:', error.message);
            // Handle error scenarios
        }
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
                    <button onClick={handleSellButtonClick}>Sell</button>;
                </div>
            </div>
        </div>
    </Container>
    );
}
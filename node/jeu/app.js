const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { path: '/socket-game' });
const port = 5110;

var games = {};

io.on('connection', (socket) => {
  console.log('Client connected');

    socket.on('joinGame', ({ gameId, user, playerDeck }) => {
        console.log("user: " + JSON.stringify(user));
        let userId = user.id;
        console.log(userId + " joined");
        // Create a new game if not exists
        if (!games[gameId]) {
            games[gameId] = {
                players: {userId: user},
                activeTurn: userId,
                decks: {userId: playerDeck},
                sockets: {userId: socket}
            };
            console.log("Waiting for other player game " + gameId);
        }else{
            const opponentId = getOpponentId(user.id);

            games[gameId].players[userId] = user;
            games[gameId].decks[userId] = playerDeck;

            //Start Game
            socket.emit('start', {activeTurn: true});
            games[gameId].sockets[opponentId].emit('start', {activeTurn: false});
            console.log("Game started " + gameId);
    }});
    

    // Handle the 'sendCards' event
    socket.on('sendCards', ({ selectedPlayerCard, selectedOpponentCard, user, gameId }) => {
        console.log(JSON.stringify(selectedPlayerCard));
        const opponentId = getOpponentId(user.id);

        //let attackingCardId = selectedPlayerCard.id;
        let defendingCardId = selectedOpponentCard.id;

        let remainingHp = selectedOpponentCard.hp (selectedPlayerCard.attack/selectedOpponentCard.defence);
        let updatedCards;
        if(remainingHp < 0){
            updatedCards = games[gameId].decks[opponentId].filter(card => card.id !== defendingCardId);
        }else{
            updatedCards = games[gameId].decks[opponentId].map(card => card.id === defendingCardId ? { ...card, hp: remainingHp } : card);
        }
        
        if(updatedCards.length === 0){
            // Game over
            socket.emit('gameOver', {
                winner: true
            });
            games[gameId].sockets[opponentId].emit('gameOver', {
                winner: false
            });
        }else{
            games[gameId].decks[opponentId] = updatedCards;

            // Notify both players about the updated decks
            socket.emit('updateDecks', {
                playerDeck: games[gameId].decks[user.id],
                opponentDeck: games[gameId].decks[opponentId],
                activeTurn: false,
            });
    
            games[gameId].sockets[opponentId].emit('updateDecks', {
                playerDeck: games[gameId].decks[opponentId],
                opponentDeck: games[gameId].decks[user.id],
                activeTurn: true,
            });
        }
    });

    // Handle the 'disconnect' event
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        games = {};

        //TODO faire proprement
        //   delete games[gameId].players[user.id];

        //   // Notify the remaining player about the opponent's disconnection
        //   const remainingPlayerId = Object.keys(games[gameId].players)[0];
        //   if (remainingPlayerId) {
        //     games[gameId].players[remainingPlayerId].socket.emit('opponentDisconnected');
        //   }

        //   // Remove the game if both players have disconnected
        //   if (Object.keys(games[gameId].players).length === 0) {
        //     delete games[gameId];
        //   }
    });
});

// Helper function to get opponent's ID
const getOpponentId = (currentPlayerId, gameId) => {
    console.log("looking up gameId" + gameId);
    return Object.keys(games[gameId].players).find((playerId) => playerId !== currentPlayerId);
};

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
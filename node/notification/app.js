const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { path: '/socket-service' });
const port = 5102;

app.use(express.json());

const clients = {};
const users = {};
const decks = {};

let looking_for_opponent = null;

app.post('/notify', (req, res) => {
  const { clientId, postData } = req.body;

  if (clientId && clients[clientId]) {
    // Broadcast the data to the specific client
    clients[clientId].emit('post-data', postData);
    res.json({ success: true, message: 'POST request received successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Client not found' });
  }
});

function generateHash(int1, int2) {
  const currentTime = new Date().getTime().toString();
  const dataToHash = `${int1}-${int2}-${currentTime}`;
  
  const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
  return hash;
}

const start_game = (id1, id2) => {
  console.log("Starting game with " + id1 + " and " + id2); 
  let gameId = generateHash(id1, id2);
  clients[id1].emit("start", ({"user":users[id2], "deck":decks[id2], "gameId": gameId, "activeTurn":true}));
  clients[id2].emit("start", ({"user":users[id1], "deck":decks[id1], "gameId": gameId, "activeTurn":false}));
};

io.on('connection', (socket) => {
    console.log('connected', socket.id);
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
    socket.on('register-client', ({ user, deck }) => {
        // Store the socket associated with the client ID
        clients[user.id] = socket;
        users[user.id] = user;
        decks[user.id] = deck;
        console.log(`Client ${user.id} connected`);
        if(looking_for_opponent != null && looking_for_opponent != user.id){
          start_game(looking_for_opponent, user.id);
          looking_for_opponent = null;
        }else{
          looking_for_opponent = user.id;
        }
        // Handle disconnecti
        socket.on('disconnect', () => {
          if(looking_for_opponent === user.id){
            looking_for_opponent = null;
          }
          delete clients[user.id];
          delete users[user.id];
          delete decks[user.id];
          console.log(`Client ${user.id} disconnected`);
        });
    });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
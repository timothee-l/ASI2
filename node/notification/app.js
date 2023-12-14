const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { path: '/socket-service' });
const port = 5102;

app.use(express.json());

const clients = {};

app.get('/', (req, res) => {
    res.json({ success: true, message: 'Hello!' });
});

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

io.on('connection', (socket) => {
    console.log('connected', socket.id)
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
    socket.on('register-client', (clientId) => {
        // Store the socket associated with the client ID
        clients[clientId] = socket;
        console.log(`Client ${clientId} connected`);
        socket.emit("Registered successfully");
        // Handle disconnection
        socket.on('disconnect', () => {
        delete clients[clientId];
        console.log(`Client ${clientId} disconnected`);
        });
    });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
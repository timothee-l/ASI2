const express = require('express');
const app = express();
var http = require('http').Server(app);
const socketIo = require('socket.io');
const io = socketIo(http, { path: '/chat-socket' });


app.set("port", process.env.PORT || 5104) //Connexion port 5104
var server = http.listen(5104, () => {console.log("server is running on port", server.address().port);});

io.on(
    'connection', (socket) => {  
        console.log('connected')
    socket.on('chat message', (msg) => {    
    io.emit('chat message', msg);  
});});

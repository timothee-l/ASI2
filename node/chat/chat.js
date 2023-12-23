const express = require('express');
const app = express();
var http = require('http').Server(app);
const socketIo = require('socket.io');
const io = socketIo(http, { path: '/chat-socket' });
const http2 = require('http');

const options = {
  port: 8082,
  method: 'POST',
  URL: 'http://localhost:8082/sendmsg',
  body: '',
  type: String,
};


app.set("port", process.env.PORT || 5104) //Connexion port 5104
var server = http.listen(5104, () => {console.log("server is running on port", server.address().port);});

io.on(
    'connection', (socket) => {  
        console.log('connected')
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg)
        options.body = msg;
        const req = http2.request(options, (res) => {
            console.log(options.body)
            res.on('data', (data) => {
        console.log(data);
    });

    res.on('end', () => {
        console.log('Response received');
     });
    });

    req.on('error', (err) => {
    console.error('Error:', err.message);
    });

    req.end();
});});





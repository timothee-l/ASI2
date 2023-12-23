const express = require('express');
const app = express();
var http = require('http').Server(app);
const json = require('json');
const socketIo = require('socket.io');
const io = socketIo(http, { path: '/chat-socket' });
const { Client } = require('http');

/*const options = {
  hostname: 'localhost',
  port: 8082,
  method: 'POST',
  path: '/',
  body: JSON.stringify({
    message: 'Hello from Node.js!',
  }),
};
*/
app.set("port", process.env.PORT || 5106) //Connexion port 5106
var server = http.listen(5106, () => {console.log("server is running on port", server.address().port);});

/*
const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', (data) => {
    console.log(`data: ${data}`);
  });
});

req.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

req.end();
*/

io.on( 'connection', (socket) => {
    socket.on('chat message', (msg) => {
        const client = new Client();
    client.post('http://localhost:8082', {
      message: message,
    });});});
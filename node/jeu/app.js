const express = require('express');
const socketIo = require('socket.io');

const app = express();
const port = 5110;

let gameOver = false;
let damageValue = 0;

while (!gameOver){
    //TODO : gameloop
    damageValue = CardAttacking.attack - CardDefending.defense
    if (damageValue < 0){
        damageValue = 0;
    }
    CardDefending.HP = CardDefending.HP - damageValue;
    console.log("The attacker did %d to the defender", damageValue);
    if (CardDefending.HP <= 0){
        console.log("Defender has died");
        // TODO send notification that card is dead and it should become untargetable
    }
    // TODO send notification to update the gameboard with health Values
}

if (gameOver){
    console.log("game is over");
    //TODO : send notification to the players and return them to the home page
}
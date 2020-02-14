import express from 'express';
import http from 'http';
import {createGame} from './game.js';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const game = createGame();

// game.addFruit({fruitId:"frutinha", fruitX:3, fruitY:3})

io.on('connection', (socket ) => {

  const playerId = socket.id;
  console.log(`connected on server id: ${playerId}`)

  game.addPlayer({playerId:playerId})

  socket.emit('setup', game.state)

  socket.on('disconnect', () => {
    console.log(`disconnected of server id: ${playerId}`)
    game.removePlayer({ playerId: playerId })
  })
});

app.use(express.static('C://github//Jogo-Multiplayer'))

app.get('/', function(req, res){
    res.sendFile('C://github//Jogo-Multiplayer//index.html');
  });

server.listen(3000, () =>{
    console.log("listening on 3000");
});
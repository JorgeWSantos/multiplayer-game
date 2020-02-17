import express from 'express';
import http from 'http';
import {createGame} from './game.js';
import socketio from 'socket.io';
import path from 'path';
const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const game = createGame();

console.log("opa")
console.log(__dirname)

game.subscribe((command) => {

  console.log(`> Emitting ${command.type}`)
  io.emit(command.type, command)
})

io.on('connection', (socket ) => {

  const playerId = socket.id;
  console.log(`connected on server id: ${playerId}`);

  socket.on('newPlayer', () => {

    game.addPlayer({playerId:playerId});
    socket.emit('setup', game.state);
  });

  socket.on('stopFruit', () => {
    game.stopAddFruit();
  });

  socket.on('resetPoints', () => {
    game.resetPoints();
  });

  socket.on('admin', () => {

    socket.emit('setup', game.state);
  });

  socket.on('disconnect', () => {
    console.log(`disconnected of server id: ${playerId}`)
    game.removePlayer({ playerId: playerId })
  });

  socket.on('move-player', (command) => {
    console.log(`move on server`)
    game.movePlayer(command)
  });

  socket.on('startFruit', (command) => {
    game.stopAddFruit()
    const frequency = Number(command) * 1000
    console.log(frequency)
    game.startAddFruit(frequency)
  });
});

app.use(express.static(__dirname))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/admin.html');
});


var port = process.env.PORT || 3000;

server.listen(port, () =>{
    console.log("listening on 3000");
});
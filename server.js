const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const fs = require('fs'); 
const _ = require('lodash');

let players = [];
let tiles = [[],[],[]];

fs.readFile('client/data/static.json', function(err, data) { 
    if (err) throw err; 
    const combo = JSON.parse(data); 

    let set = _.shuffle(_.slice(_.shuffle(combo.tileset), 0, 120));
    let backSets = ['poisons', 'hindrances', 'poisons']
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 40; j++) {
            _.set(tiles[i], [j, 'id'], set[(i*40)+j].id);
            _.set(tiles[i], [j, 'level'], i);
            _.random(0,99)>80 ?
                _.set(tiles[i], [j, 'back'], [combo[backSets[i]][_.random(0,4)], combo[backSets[i]][_.random(0,4)]]) :
                _.set(tiles[i], [j, 'back'], [combo[backSets[i]][_.random(0,4)]]);
            _.set(tiles[i], [j, 'backSize'], tiles[i][j].back.length);
        }
    }
//    console.dir(tiles);
});

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayerA');
    };

    socket.on('dealCards', function () {
        io.emit('dealCards');
    });

    socket.on('cardPlayed', function (gameObject, isPlayerA) {
        io.emit('cardPlayed', gameObject, isPlayerA);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

// https://www.freecodecamp.org/news/how-to-build-a-multiplayer-card-game-with-phaser-3-express-and-socket-io/


http.listen(3000, function () {
    console.log('Server started!');
});
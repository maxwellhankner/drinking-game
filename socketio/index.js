const socket = require('socket.io');
const db = require("../models");
const Sequelize = require('sequelize');


module.exports = function(server){
    var username;
    var io = socket(server);
    var allPlayers = [];
    var playerResponses = [];

    io.on('connection', (socket) => {
        console.log('made socket connection', socket.id);
        


        socket.on('new-player', function(data){
            username = data;
            allPlayers.push(username);
            console.log(allPlayers);
            io.sockets.emit('update-players-list', allPlayers)
        });

        socket.on('start-with-players', function(){
            db.Prompt.findOne({
                order: [
                  Sequelize.fn( 'RAND' ),
                ]
            })
            .then(({text}) => {
                io.sockets.emit('play-prompt', text);
            })
        })

        socket.on('player-response-true', function(data){
            playerResponses.push({username: username, response: data})
            console.log(playerResponses)
        })

    });
}

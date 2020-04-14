const socket = require('socket.io');
const db = require("../models");
const Sequelize = require('sequelize');

module.exports = function(server){
    var io = socket(server);
    var allPlayers = [];

    io.on('connection', (socket) => {
        console.log('made socket connection', socket.id);
        


        socket.on('new-player', function(data){
            allPlayers.push(data);
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

    });
}

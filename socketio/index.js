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

                console.log('Players: '+ allPlayers.length, 'Responses: ' + playerResponses.length) //Displays 1 0 since no responses have been sent. 
            });

            socket.on('player-response-true', function(data){
                console.log('player response true')
                playerResponses.push({username: username, response: data}) 
                console.log('Players: '+ allPlayers.length, 'Responses: ' + playerResponses.length)
                
                if (allPlayers.length === playerResponses.length){
                    console.log('All players have responded') 
                };                   
            });

        });        
    });
}
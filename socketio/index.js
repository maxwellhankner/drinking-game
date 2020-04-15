const socket = require('socket.io');
const db = require("../models");
const Sequelize = require('sequelize');


module.exports = function(server){
  var io = socket(server);
  var allPlayers = [];
  var answerCount = 0;
  var currentAnswer = '';
  var playerReadyCount = 0;

  io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);
    
    socket.on('new-player', function(data){
        allPlayers.push({username: data, userId: socket.id, answer: null});
        var nameList = getNameList(allPlayers);
        console.log(allPlayers);
        console.log(nameList);
        io.sockets.emit('update-players-list', nameList)
    });

    socket.on('start-with-players', function(){
        emitRandomPrompt();
    })

    socket.on('player-response', function(data){
      
      for (var i = 0; i < allPlayers.length; i++){
        if (socket.io === allPlayers[i].userId){
          allPlayers[i].answer = data;
        }
      }

      answerCount += 1;

      if (answerCount === allPlayers.length) {
          io.sockets.emit('all-players-answered', currentAnswer)
      }
    })

    socket.on('after-ready-button', function(){
      playerReadyCount += 1;
      
      if (playerReadyCount === allPlayers.length){
        console.log('all players ready for next question')
        resetForNextPrompt();
        emitRandomPrompt();
      }
    })

    socket.on('after-end-button', function(){
      console.log('server ended game')
      
      io.sockets.emit('end-game', 'The game has ended')
      allPlayers = [];
      resetForNextPrompt();
      // reset the server      
    })

    function emitRandomPrompt(){
      db.Prompt.findOne({
        order: [
          Sequelize.fn( 'RAND' ),
        ]
      })
      .then(({text, answer}) => {
      currentAnswer = answer;
        io.sockets.emit('play-prompt', text);
      })
    }

    function resetForNextPrompt(){
      answerCount = 0;
      currentAnswer = '';
      playerReadyCount = 0;
    }

  });
}

// Create an array of only player names as strings, not players as objects
function getNameList(array){
  var newArray = [];
  for (var i = 0; i < array.length; i++){
    newArray.push(array[i].username);
  }
  return newArray;
}






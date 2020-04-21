const socket = require('socket.io');
const db = require("../models");
const Sequelize = require('sequelize');


module.exports = function(server){
  var io = socket(server);
  var allPlayers = [];
  var answerCount = 0;
  var currentAnswer = '';
  var playerReadyCount = 0;
  var topResponsesArray = [];
  var usedPromptArray = [];
  
  
  io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);
    
    socket.on('new-player', function(data){
        allPlayers.push({username: data, userId: socket.id, answer: null});
        var nameList = getNameList(allPlayers);
        io.sockets.emit('update-players-list', nameList);
    });

    socket.on('start-with-players', function(){
        usedPromptArray = [];
        emitRandomPrompt();
    })

    socket.on('player-response', function(data){
      if(data === 'true' || data === 'false'){
        for (var i = 0; i < allPlayers.length; i++){
          if (socket.id === allPlayers[i].userId){
            allPlayers[i].answer = data;
          }
        }
  
        answerCount += 1;

        if (answerCount === allPlayers.length) {
          io.sockets.emit('all-players-answered', currentAnswer)
        }
      }
      else {
        topResponsesArray.push(data);
        for (var i = 0; i < allPlayers.length; i++){
          if (socket.id === allPlayers[i].userId){
            allPlayers[i].answer = data;
          }
        }

        answerCount += 1;
  
        if (answerCount === allPlayers.length) {
          var winnerResponse = getWinners(topResponsesArray);
          for (var i = 0; i < allPlayers.length; i++){
            if (allPlayers[i].open === winnerResponse){
              var theWinner = allPlayers[i].username
            }
          }
          io.sockets.emit('all-players-answered', {winner: theWinner, prompt: winnerResponse})
        }
      }
    })

    socket.on('player-response-open-text', function(data){
      for (var i = 0; i < allPlayers.length; i++){
        if (socket.id === allPlayers[i].userId){
          allPlayers[i].answer = data;
          allPlayers[i].open = data;
        }
      }

      answerCount += 1;

      if (answerCount === allPlayers.length) {
        answerCount = 0;
        io.sockets.emit('all-players-responded-open', allPlayers);
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
    })
   


    socket.on('reset-game-button', function(){
      io.sockets.emit('end-game', 'The game has ended')
      answerCount = 0;
      currentAnswer = '';
      playerReadyCount = 0;
      topResponsesArray = [];
      usedPromptArray = [];
      allPlayers = [];
      resetForNextPrompt();
    })


    function emitRandomPrompt(){
      db.Prompt.findOne({
        order: [
          Sequelize.fn( 'RAND' ),
        ]
      })
      .then(({id, text, answer}) => {
          currentAnswer = answer;
          checkIfUsed(id, text, answer)
      })
    }

    function checkIfUsed(id, text, answer){
        var currentPromptId = id;
        if (usedPromptArray.includes(currentPromptId)){
              emitRandomPrompt();
        }
        else if (answer === 'true' || answer === 'false'){
              usedPromptArray.push(currentPromptId);
              io.sockets.emit('play-boolean-prompt', text);
              checkUsedPromptArrayLength();
        } 
        else {
              usedPromptArray.push(currentPromptId);
              io.sockets.emit('play-open-prompt', text);
              checkUsedPromptArrayLength();
        }
    }
    
    function checkUsedPromptArrayLength(){
        if (usedPromptArray.length === 49){
            usedPromptArray.shift();
        }
    }


    function resetForNextPrompt(){
      answerCount = 0;
      currentAnswer = '';
      playerReadyCount = 0;
      topResponsesArray = [];
    }

  });

function getNameList(array){
  var newArray = [];
  for (var i = 0; i < array.length; i++){
    newArray.push(array[i].username);
  }
  return newArray;
}

function getWinners(responsesArray){
  var mostOften = findMode(responsesArray);
  return mostOften;
}

function findMode(arr){
    var numMapping = {};
    for(var i = 0; i < arr.length; i++){
        if(numMapping[arr[i]] === undefined){
            numMapping[arr[i]] = 0;
        }        
            numMapping[arr[i]] += 1;
    }
    var greatestFreq = 0;
    var mode;
    for(var prop in numMapping){
        if(numMapping[prop] > greatestFreq){
            greatestFreq = numMapping[prop];
            mode = prop;
        }
    }
    return mode;
}
}

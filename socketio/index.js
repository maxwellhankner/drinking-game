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
        console.log(allPlayers);
        console.log(nameList);
        io.sockets.emit('update-players-list', nameList)
    });

    socket.on('start-with-players', function(){
        usedPromptArray = [];
        emitRandomPrompt();
    })

    socket.on('player-response', function(data){
      console.log(data);
      console.log(currentAnswer);
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
            if (allPlayers[i].answer === winnerResponse){
              var theWinner = allPlayers[i].username
            }
          }
          io.sockets.emit('all-players-answered', theWinner)
        }
      }
    })

    socket.on('player-response-open-text', function(data){
      console.log(allPlayers.length)
      for (var i = 0; i < allPlayers.length; i++){
        console.log(socket.id)
        if (socket.id === allPlayers[i].userId){
          allPlayers[i].answer = data;
        }
      }

      answerCount += 1;

      if (answerCount === allPlayers.length) {
        // Reset
        answerCount = 0;
        // Create all responses array
        var playerAnswers = getAllOpenResponseList(allPlayers);
        io.sockets.emit('all-players-responded-open', playerAnswers);
      }
    })

    socket.on('after-ready-button', function(){
      playerReadyCount += 1;
      
      if (playerReadyCount === allPlayers.length){
        console.log('all players ready for next question')
        resetForNextPrompt();
        emitRandomPrompt();
        console.log('reset just happened')
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
      .then(({id, text, answer}) => {
          checkIfUsed(id, text, answer)
      })
    }


    function checkIfUsed(id, text, answer){
        var currentPromptId = id;
          // Looks for the currentPromptId within the usedPromptArray
        if (usedPromptArray.includes(currentPromptId)){
              console.log('ALREADY SHOWN, RENDER ANOTHER PROMPT')
              emitRandomPrompt();
        }   // Handles a boolean prompt
        else if (answer === 'true' || answer === 'false'){
              usedPromptArray.push(currentPromptId);
              console.log('Current prompt id ' + currentPromptId)
              console.log('usedPromptArray length ' + usedPromptArray.length)
              io.sockets.emit('play-boolean-prompt', text);
              checkUsedPromptArrayLength();
        } 
        else { // Handles an open prompt
              usedPromptArray.push(currentPromptId);
              console.log('Current prompt id ' + currentPromptId)
              console.log('usedPromptArray length ' + usedPromptArray.length)
              io.sockets.emit('play-open-prompt', text);
              checkUsedPromptArrayLength();
        }
    }

    // Checks the length of the usedPromptArray, if the array length = ?, release index 0 back to the available prompt pool.
    // This function will allow the game to run indefinitely while preventing a prompt from re-appearing too often.
    function checkUsedPromptArrayLength(){
        if (usedPromptArray.length === 4){
            console.log('usedPromptArray length BEFORE shift ' + usedPromptArray)
            // Removes index 0 of the usedPromptArray
            usedPromptArray.shift();
            console.log('usedPromptArray length AFTER shift ' + usedPromptArray)
        }
    }


    function resetForNextPrompt(){
      answerCount = 0;
      currentAnswer = '';
      playerReadyCount = 0;
      topResponsesArray = [];
    }

  });


// Create an array of only player names as strings, not players as objects
function getNameList(array){
  var newArray = [];
  for (var i = 0; i < array.length; i++){
    newArray.push(array[i].username);
  }
  return newArray;
}

function getAllOpenResponseList(array){
  var newArray = [];
  for (var i = 0; i < array.length; i++){
    newArray.push(array[i].answer);
  }
  return newArray;
}

function getWinners(responsesArray){
  // figure out the top response(s)
  var mostOften = findMode(responsesArray);
  // push those players in the returned array
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

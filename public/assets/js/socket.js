function init(){
    // Our answer
    var ourAnswer;
    // Connect to server
    const socket = io('ws://localhost:8080');
    // Emit username
    var username = $('#username').val();
    $('#username').val('');
    socket.emit('new-player', username)

    // Players List
    playersList = $('.players-list');
    socket.on('update-players-list', response => {
        playersList.empty();
        for (var i = 0; i < response.length; i++){
            thisPlayer = $('<p>').text(response[i]);
            playersList.append(thisPlayer);
        }
    });

    // Start with players
    startWithPlayersButton = $('#start-with-players-button')
    startWithPlayersButton.click(function(){
        socket.emit('start-with-players', 'lets go');
    })

    // Play prompt
    socket.on('play-prompt', function(data){
        $('.waiting-area').attr('style', 'display: none');
        $('.view-prompt').attr('style', 'display: block');
        $('.prompt-text').empty();
        let prompt = $('<p>').text(data);
        $('.prompt-text').append(prompt);
    })

    afterResponse = $('.after-response');
    afterResponseText = $('.after-response-text');
    responseTrueButton = $('#response-true-button');

    responseTrueButton.click(function(){
        ourAnswer = 'true';
        socket.emit('player-response', 'true');
        $('.view-prompt').hide();
        var afterElement = $('<p>').text('Waiting for all players to answer...')
        afterResponseText.empty();
        afterResponseText.append(afterElement);
        $('.after-response').show();
    })
    
    
    responseFalseButton = $('#response-false-button');
    responseFalseButton.click(function(){
        ourAnswer = 'false';
        socket.emit('player-response', 'false');
        $('.view-prompt').hide();
        var afterElement = $('<p>').text('Waiting for all players to answer...')
        afterResponseText.empty();
        afterResponseText.append(afterElement);
        $('.after-response').show();
    })
    
    afterResponseNext = $('.after-response-next');

    socket.on('all-players-answered', function(data){
        afterResponseNext.show();
        var checkedUserResponse;
        if(data === ourAnswer){
            checkedUserResponse = 'Correct, no need to drink.';
        }
        else{
            checkedUserResponse = 'Wrong, cheers mate!'
        }
        var afterElement = $('<p>').text(checkedUserResponse)
        afterResponseText.empty();
        afterResponseText.append(afterElement);
    })

    afterReadyButton = $('#after-ready-button');
    afterReadyButton.click(function(){
        socket.emit('after-ready-button', 'READY');
        afterReadyButton.hide();
    })

}
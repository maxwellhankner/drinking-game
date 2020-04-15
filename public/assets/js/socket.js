function init(){
    // Connect to server
    const socket = io('http://localhost:8080');
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

    var myResponse;

    responseTrueButton = $('#response-true-button');
    responseTrueButton.click(function(){
        myResponse = 'true';
        socket.emit('player-response-true', myResponse);
    })
    responseFalseButton = $('#response-false-button');
    responseFalseButton.click(function(){
        myResponse = 'false';
        socket.emit('player-response-false', myResponse);
    })

    socket.on('received-all-responses', function(data){
        console.log('received all responses')
        if (myResponse === data){
            $('.promptResponses').attr('style', 'display: none');
            $('.prompt-text').empty();
            let drink = $('<p>').text('You got it correct! Do not drink.');
            $('.prompt-text').append(prompt);    
            
        }
    })

}
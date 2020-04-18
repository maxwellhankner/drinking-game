function init() {

    // Our answer
    var ourAnswer;

    // Our 
    var ourBlurFactor = 0;

    const socket = io(window.origin);
    // Emit username
    var username = $('#username').val();
    $('#username').val('');
    socket.emit('new-player', username)

    // Players List
    playersList = $('.players-list');
    socket.on('update-players-list', response => {
        playersList.empty();
        for (var i = 0; i < response.length; i++) {
            thisPlayer = $('<p>').text(response[i]);
            playersList.append(thisPlayer);
        }
    });


    // Start with players
    startWithPlayersButton = $('#start-with-players-button')
    startWithPlayersButton.click(function () {
        socket.emit('start-with-players', 'lets go');
    })

    // Play boolean prompt
    socket.on('play-boolean-prompt', function (data) {
        // Reset Interface
        $('.after-response').hide();
        $('#after-ready-button').show();
        $('.prompt-responses').show();
        $('.prompt-response-open').hide();

        // Play the given prompt
        $('.waiting-area').attr('style', 'display: none');
        $('.view-prompt').attr('style', 'display: block');
        $('.prompt-text').empty();
        let prompt = $('<p>').text(data);
        $('.prompt-text').append(prompt);
    })

    // Play open prompt
    socket.on('play-open-prompt', function (data) {
        // Reset Interface
        $('.after-response').hide();
        $('#after-ready-button').show();
        $('.prompt-responses').hide();
        $('.prompt-response-open').show();

        // Play the given prompt
        $('.waiting-area').attr('style', 'display: none');
        $('.view-prompt').attr('style', 'display: block');
        $('.prompt-text').empty();
        let prompt = $('<p>').text(data);
        $('.prompt-text').append(prompt);
    })

    // Event listener for submitting open response text
    responseOpenButton = $('#response-open-button');
    responseOpenText = $('#response-open-text');
    responseOpenButton.click(function () {
        var response = responseOpenText.val();
        responseOpenText.val('');
        socket.emit('player-response-open-text', response);
        $('.prompt-response-open').hide();
    })

    socket.on('all-players-responded-open', function (data) {
        $('.all-open-responses').show();
        $('.all-open-responses').empty();
        for (var i = 0; i < data.length; i++) {
            var buttonDiv = $('<div>');
            var openElement = $('<button>');
            openElement.text(data[i]);
            openElement.addClass('response-button btn btn-dark');
            buttonDiv.append(openElement)
            $('.all-open-responses').append(buttonDiv);
            $('.after-response-next').hide();
        }
    })

    afterResponse = $('.after-response');
    afterResponseText = $('.after-response-text');
    responseTrueButton = $('#response-true-button');

    responseButton = $('.response-button');
    gameContainer.on('click', '.response-button', function () {
        var response = $(this).text();
        if (response === 'TRUE' || response === 'FALSE') {
            response = response.toLowerCase();
        }
        ourAnswer = response;
        socket.emit('player-response', response);
        $('.view-prompt').hide();
        var afterElement = $('<p>').text('Waiting for all players to answer...')
        afterResponseText.empty();
        afterResponseText.append(afterElement);
        $('.after-response').show();
        $('.after-response-next').hide();
    })

    afterResponseNext = $('.after-response-next');

    socket.on('all-players-answered', function (data) {
        $('.all-open-responses').hide();
        afterResponseNext.show();
        if (data === 'true' || data === 'false') {
            var checkedUserResponse;
            console.log(data);
            console.log('our: ' + ourAnswer);
            if (data === ourAnswer) {
                // playSoundSuccess();
                playSoundCorrectAnswer();
                checkedUserResponse = 'CORRECT! No need to drink.';
                ourBlurFactor = 0;
                updateBlurEffect(ourBlurFactor);
            }
            else {
                playSoundGlassClink();
                checkedUserResponse = 'WRONG! Cheers mate!';
                ourBlurFactor += .5;
                updateBlurEffect(ourBlurFactor);
            }
            var afterElement = $('<p>').text(checkedUserResponse)
            afterResponseText.empty();
            afterResponseText.append(afterElement);
        }
        else {
            // glassClink();
            playSoundGlassClink();
            var afterElement = $('<p>');
            afterElement.text(data + " gives out a drink.")
            afterResponseText.empty();
            afterResponseText.append(afterElement);

        }
    })

    afterReadyButton = $('#after-ready-button');
    afterReadyButton.click(function () {
        socket.emit('after-ready-button', 'READY');
        afterReadyButton.hide();
    })

    afterEndButton = $('#after-end-button');
    afterEndButton.click(function () {
        socket.emit('after-end-button', 'The game has ended');
        console.log('reset page')
    })

    socket.on('end-game', function () {

        window.location.reload();
        return false;
    })

    resetGameButton = $('#reset-game-button');
    resetGameButton.click(function () {
        console.log('reset game')
        socket.emit('reset-game-button', 'reset')
    })
}
function updateBlurEffect(factor) {
    $('html').attr('style', `filter: blur(${factor}px)`)
}
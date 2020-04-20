// Containers
let landingContainer = $('.landing-container');
let promptsContainer = $('.prompts-container');
let usernameContainer = $('.username-container');
let gameContainer = $('.game-container');

// Buttons
let toggleMuteButton = $('.toggle-mute');
let joinGameButton = $('#join-game-button');
let editPromptsButton = $('#edit-prompts-button');
let backToLandingButton = $('#back-to-landing');
let startButton = $('#start-button');
let submitButton = $('#response-open-button');
let readyButton = $('#after-ready-button');
let letsGoButton = $('#start-with-players-button');
let resetButton = $('#after-end-button');

let toggleOn = true;
toggleMuteButton.click(function(){
if(toggleOn){
    toggleOn = false
    $('#mute-icon').removeClass('fa-volume-up');
    $('#mute-icon').addClass('fa-volume-mute');
}
else{
    toggleOn = true;
    $('#mute-icon').removeClass('fa-volume-mute');
    $('#mute-icon').addClass('fa-volume-up');
}
})

resetButton.click(function(){
    playSoundResetButton();
})


editPromptsButton.click(function(){
    landingContainer.attr('style', 'display: none');
    promptsContainer.attr('style', 'display: block');
})

backToLandingButton.click(function(){
    landingContainer.attr('style', 'display: block');
    promptsContainer.attr('style', 'display: none');
})

joinGameButton.click(function(){
    landingContainer.attr('style', 'display: none');
    usernameContainer.attr('style', 'display: block');
    
})

startButton.click(function(){
    playSoundGlassClink();  
    usernameContainer.attr('style', 'display: none');
    gameContainer.attr('style', 'display: block');
    init();
})

submitButton.click(function(){
    playSoundJoinConfirm();
})

readyButton.click(function(){
    playSoundSubmitAnswer();
})

letsGoButton.click(function(){
    playSoundSubmitAnswer();
})

// -------------------------------------------------- API CALLS
// Add new prompt using api call
var addPromptButton = $('#add-prompt-button')

addPromptButton.click(function(){
    var newPromptText = $('#new-prompt-text');
    var promptText = newPromptText.val();
    newPromptText.val('');

    var promptType = getActivePromptType();

    $.ajax('/api/new', {
        type: 'POST',
        data: {
            text: promptText,
            answer: promptType
        }
    })
    .then(function(){
        console.log("submitted");
    })
})

function getActivePromptType(){
    var answer;
    answer = $('.active').attr('id');
    return answer;
}
// Containers
let landingContainer = $('.landing-container');
let promptsContainer = $('.prompts-container');
let usernameContainer = $('.username-container');
let gameContainer = $('.game-container');

// Buttons
let joinGameButton = $('#join-game-button');
let editPromptsButton = $('#edit-prompts-button');
let backToLandingButton = $('#back-to-landing');
let startButton = $('#start-button');
let booleanTrueButton = $('#response-true-button');

// booleanTrueButton.click(function(){
//     playSoundSuccess();
// })

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
    playSoundGlassClink();
    // playSoundSuccess();
})

startButton.click(function(){
    usernameContainer.attr('style', 'display: none');
    gameContainer.attr('style', 'display: block');
    init();
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
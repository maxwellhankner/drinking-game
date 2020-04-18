
let soundGlassClink = "glass-clink-sound";
let soundCorrectAnswer = "correct-answer-sound";
let soundSubmitAnswer = "submit-answer-sound";
let soundJoinConfirm = "join-confirm-sound";
let soundResetButton = "reset-button-sound";
// let muteButton = $('#un-mute')

// HANDLES AUDIO FILE REGISTRATION FOR SOUNDJS
function loadSounds () {
    createjs.Sound.registerSound("assets/sounds/glass-clink-1.mp3", soundGlassClink);
    createjs.Sound.registerSound("assets/sounds/correctanswer.mp3", soundCorrectAnswer);
    createjs.Sound.registerSound("assets/sounds/submitanswer.mp3", soundSubmitAnswer);
    createjs.Sound.registerSound("assets/sounds/joinconfirm.mp3", soundJoinConfirm);
    // createjs.Sound.registerSound("assets/sounds/resetbutton.mp3", soundResetButton);
}

function playSoundGlassClink () {
    createjs.Sound.play(soundGlassClink);
}

function playSoundCorrectAnswer(){
    createjs.Sound.play(soundCorrectAnswer);
}

function playSoundSubmitAnswer(){
    createjs.Sound.play(soundSubmitAnswer);
}

function playSoundJoinConfirm(){
    createjs.Sound.play(soundJoinConfirm);
}

function playSoundResetButton(){
    // createjs.Sound.play(soundResetButton);
}


// function playSoundJoinConfirm2(){
//     createjs.Sound.play(soundJoinConfirm2);
// }

// function playSoundCorrectAnswer2(){
//     createjs.Sound.play(soundCorrectAnswer2);
// }



   
    

    






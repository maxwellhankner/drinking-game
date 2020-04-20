let soundGlassClink = "glass-clink-sound";
let soundCorrectAnswer = "correct-answer-sound";
let soundSubmitAnswer = "submit-answer-sound";
let soundJoinConfirm = "join-confirm-sound";
let soundResetButton = "reset-button-sound";

// HANDLES AUDIO FILE REGISTRATION FOR SOUNDJS
function loadSounds () {
    createjs.Sound.registerSound("assets/sounds/glass-clink-1.mp3", soundGlassClink);
    createjs.Sound.registerSound("assets/sounds/correctanswer.mp3", soundCorrectAnswer);
    createjs.Sound.registerSound("assets/sounds/submitanswer.mp3", soundSubmitAnswer);
    createjs.Sound.registerSound("assets/sounds/joinconfirm.mp3", soundJoinConfirm);
}

function playSoundGlassClink () {
    if(toggleOn){
        createjs.Sound.play(soundGlassClink);
    }
}

function playSoundCorrectAnswer(){
    if(toggleOn){
        createjs.Sound.play(soundCorrectAnswer);
    }
}

function playSoundSubmitAnswer(){
    if(toggleOn){
        createjs.Sound.play(soundSubmitAnswer);
    }
}

function playSoundJoinConfirm(){
    if(toggleOn){
        createjs.Sound.play(soundJoinConfirm);
    }
}



   
    

    






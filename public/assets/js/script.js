const socket = io('http://localhost:8080')

// var submitName = $('#send-name-button')


console.log("in");

$('.send').click(function(){
    var name = $('#name');
    console.log(name.val());
    socket.emit('user-name', name.val())
    name.val = '';
})


// socket.on('chat-message', data => {
//   appendMessage(`${data.name}: ${data.message}`)
// })
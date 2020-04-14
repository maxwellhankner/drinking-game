const socket = require('socket.io');

module.exports = function(server){
    console.log('socket');

    // Socket setup & pass server
    var io = socket(server);

    io.on('connection', (socket) => {
        console.log('made socket connection', socket.id);
        // Handle chat event
        socket.on('user-name', function(data){
            // console.log(data);
            console.log(data);
        });
    });
}
var socket = io();
socket.on('connect', function(){
    console.log('We are connected to the server');

});

socket.on('disconnect', function(){
    console.log('We have been disconnected');
});

socket.on('newMessage', function(message){
    console.log('New Message', message);
});
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public/');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    //Welcome the user
    socket.emit('newMessage', generateMessage('Admin', 'Welcom to the chat'));

    //Alert everyone that someone has joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        callback('This is from the server.');

        // Send message to everyone
        io.emit('newMessage', generateMessage(message.from, message.text));
        
    });

    socket.on('disconnect', () => {
        console.log('The user has been disconnected');
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});



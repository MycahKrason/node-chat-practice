var socket = io();
socket.on('connect', function(){
    console.log('We are connected to the server');

});

socket.on('disconnect', function(){
    console.log('We have been disconnected');
});

socket.on('newMessage', function(message){
    console.log('New Message', message);
    //create a list item
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'hi'
}, function(data){
    console.log('got it', data);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(data){

    });
});